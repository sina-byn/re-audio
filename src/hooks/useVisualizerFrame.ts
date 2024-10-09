import { useState, useEffect } from 'react';

// * hooks
import useVisualizer from './useVisualizer';

const useVisualizerFrame = (dataPoints = 64) => {
  const analyserRef = useVisualizer(dataPoints);
  const [frame, setFrame] = useState<number[]>(analyserRef.current.getFrequencyData());

  useEffect(() => {
    let animationFrameId: number;

    const updateBars = () => {
      const frameFreqData = analyserRef.current.getFrequencyData();
      setFrame(frameFreqData);
      animationFrameId = requestAnimationFrame(updateBars);
    };

    updateBars();

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return frame;
};

export default useVisualizerFrame;
