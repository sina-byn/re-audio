// * types
import type { Pixel, ColorChannel } from '../hooks/useCoverPalette';

type TimeChunk = string | number;

export const isNullish = (value: any) => [null, undefined].includes(value);

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minutes * 60);

  const chunks: TimeChunk[] = [minutes, seconds].map(c => c.toString().padStart(2, '0'));
  if (hours !== 0) chunks.unshift(hours);

  return chunks.join(':');
};

export const generateShuffledArray = (length: number = 0): number[] => {
  const shuffled: number[] = Array.from({ length }, (_, index) => index);

  if (length === 0) return shuffled;

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

// prettier-ignore
export const quantization = (pixels: Pixel[], depth: number, mainChannel: ColorChannel): Pixel[] => {
  const MAX_DEPTH = 4;

  if (depth === MAX_DEPTH || pixels.length === 0) {
    const color = pixels.reduce(
      (prev: Pixel, curr: Pixel) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      { r: 0, g: 0, b: 0 }
    );

    color.r = Math.round(color.r / pixels.length);
    color.g = Math.round(color.g / pixels.length);
    color.b = Math.round(color.b / pixels.length);
    return [color];
  }

  pixels.sort((p1, p2) => p2[mainChannel] - p1[mainChannel]);

  const mid = pixels.length / 2;

  return [
    ...quantization(pixels.slice(0, mid), depth + 1, mainChannel),
    ...quantization(pixels.slice(mid + 1), depth + 1, mainChannel),
  ];
};
