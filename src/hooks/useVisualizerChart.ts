import { useRef, useState, useEffect } from 'react';

// * hooks
import { useAudio } from '../components';

// * types
type ChartData = { dataPoints: number; rawAudioData: Float32Array };

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

const useVisualizerChart = (dataPoints = 64) => {
  const { audioRef, currentTrack } = useAudio();

  const [amplitude, setAmplitude] = useState<number[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    // @ts-ignore
    const audioContext = new (AudioContext || webkitAudioContext)();
    audioContextRef.current = audioContext;

    return () => {
      audioContext?.close();
    };
  }, []);

  useEffect(() => {
    setPending(true);

    let cleanup: Function | null = null;
    let aborted = false;

    (async () => {
      const audio = audioRef.current;
      const audioContext = audioContextRef.current;

      if (!audio || !audioContext || !currentTrack) {
        setPending(false);
        return;
      }

      try {
        const res = await fetch(currentTrack.src);
        if (aborted) return;

        const arrayBuffer = await res.arrayBuffer();
        if (aborted) return;

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        if (aborted) return;

        const rawAudioData = audioBuffer.getChannelData(0);

        const [worker, cleanupFn] = createWorker(workerFn);
        cleanup = cleanupFn;

        worker.postMessage({ dataPoints, rawAudioData });

        worker.onmessage = (e: MessageEvent<number[]>) => {
          if (aborted) return;

          setAmplitude(e.data);
          setPending(false);
          cleanupFn();

          cleanup = null;
        };
      } catch (err) {
        if (!aborted) setPending(false);
      }
    })();

    return () => {
      aborted = true;
      if (cleanup) cleanup();
    };
  }, [currentTrack]);

  return [amplitude, pending] as const;
};

export default useVisualizerChart;
