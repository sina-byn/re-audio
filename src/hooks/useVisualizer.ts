import { useRef, useEffect, useCallback } from 'react';

// * hooks
import { useAudio } from '../components';

// * data
const DEFAULT_ANALYSER = (dataPoints: number) => ({
  getFrequencyData: () => Array.from({ length: dataPoints }, () => 0),
});

// * types
type AudioAnalyser = { getFrequencyData: () => number[] };

const useVisualizer = (dataPoints = 64) => {
  const { audioRef, playing, trackIndex } = useAudio();

  const analyserRef = useRef<AudioAnalyser>(DEFAULT_ANALYSER(dataPoints));
  const initialized = useRef<boolean>(false);

  const initAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // @ts-ignore
    const audioContext = new (AudioContext || webkitAudioContext)();
    const audioSource = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = dataPoints * 2;

    initialized.current = true;

    const freqData = new Uint8Array(analyser.frequencyBinCount);

    analyserRef.current = {
      getFrequencyData: () => {
        analyser.getByteFrequencyData(freqData);
        return [...freqData];
      },
    };

    return () => {
      audioSource.disconnect();
      analyser.disconnect();
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    return initAnalyser();
  }, [trackIndex]);

  useEffect(() => {
    if (initialized.current) return;
    if (!('userActivation' in navigator && navigator.userActivation.hasBeenActive)) return;

    return initAnalyser();
  }, [playing]);

  return analyserRef;
};

export default useVisualizer;
