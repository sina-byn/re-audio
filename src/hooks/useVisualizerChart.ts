import { useRef, useState, useEffect } from 'react';

// * hooks
import { useAudio } from '../components';

// * types
type ChartData = { dataPoints: number; rawAudioData: Float32Array };

type UseVisualizerChartReturn = [number[], boolean];

// * utils
import { createWorker } from '../utils/worker';

const workerFn = () => {
  self.onmessage = (e: MessageEvent<ChartData>) => {
    const { dataPoints, rawAudioData } = e.data;
    const blockSize = Math.floor(rawAudioData.length / dataPoints);
    const invertedAmplitudeData: number[] = [];

    for (let i = 0; i < dataPoints; i++) {
      const start = i * blockSize;
      const end = start + blockSize;
      const block = rawAudioData.slice(start, end);

      const avg = block.reduce((sum, num) => sum + Math.abs(num), 0) / blockSize;
      const invertedAmplitude = 1 - avg;
      invertedAmplitudeData.push(invertedAmplitude);
    }

    self.postMessage(invertedAmplitudeData);
  };
};

const useVisualizerChart = (dataPoints = 64): UseVisualizerChartReturn => {
  const { audioRef, currentTrack } = useAudio();

  const [amplitude, setAmplitude] = useState<number[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    // @ts-ignore
    const audioContext = new (AudioContext || webkitAudioContext)();
    const audioSource = audioContext.createMediaElementSource(audio);
    const gainNode = audioContext.createGain();

    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    audioContextRef.current = audioContext;

    return () => {
      audioSource?.disconnect();
      gainNode?.disconnect();
      audioContext?.close();
    };
  }, []);

  useEffect(() => {
    setPending(true);

    (async () => {
      const audio = audioRef.current;
      const audioContext = audioContextRef.current;

      if (!audio || !audioContext) return;

      const res = await fetch(currentTrack.src);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const rawAudioData = audioBuffer.getChannelData(0);

      const [worker, cleanup] = createWorker(workerFn);

      worker.postMessage({ dataPoints, rawAudioData });

      worker.onmessage = (e: MessageEvent<number[]>) => {
        setAmplitude(e.data);
        setPending(false);
        cleanup();
      };
    })();
  }, [currentTrack]);

  return [amplitude, pending];
};

export default useVisualizerChart;
