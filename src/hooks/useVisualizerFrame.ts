import { useState, useEffect } from 'react';

// * hooks
import { useAudio } from '../components';
import useVisualizer from './useVisualizer';

const useVisualizerFrame = (dataPoints = 64) => {
  const analyserRef = useVisualizer(dataPoints);
  const { playing } = useAudio();
  const [frame, setFrame] = useState<number[]>(analyserRef.current.getFrequencyData());

  useEffect(() => {
    let animationFrameId: number;

    const updateBars = () => {
      const frameFreqData = analyserRef.current.getFrequencyData();
      setFrame(frameFreqData);
      animationFrameId = requestAnimationFrame(updateBars);
    };

    if (playing) updateBars();

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [playing]);

  return frame;
};

export default useVisualizerFrame;
