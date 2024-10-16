import { useState, useEffect } from 'react';

// * hooks
import { useAudio } from '../components';

// * data
const ALLOWED_COUNTS = [1, 2, 4, 8, 16];

const DEFAULT_PALETTE_CONFIG = {
  coverKey: 'cover',
  colorCount: 2,
};

// * type
export type ColorChannel = keyof Pixel;

export type Pixel = { r: number; g: number; b: number };

type PaletteConfig = { coverKey?: string; colorCount?: number; defaultPalette?: string[] };

type MessageData = { depth: number; pixelsData: Uint8ClampedArray };

type UseCoverPaletteReturn = [string[], boolean];

// * utils
const workerFunc = () => {
  const quantization = (pixels: Pixel[], depth: number, mainChannel: ColorChannel): Pixel[] => {
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

  self.onmessage = (e: MessageEvent<MessageData>) => {
    const { depth, pixelsData } = e.data;
    const pixels = [];

    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    for (let i = 0; i < pixelsData.length; i += 4) {
      const r = pixelsData[i];
      const g = pixelsData[i + 1];
      const b = pixelsData[i + 2];

      rMin = Math.min(rMin, r);
      gMin = Math.min(gMin, g);
      bMin = Math.min(bMin, b);

      rMax = Math.max(rMax, r);
      gMax = Math.max(gMax, g);
      bMax = Math.max(bMax, b);

      pixels.push({ r, g, b });
    }

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
    const maxRange = Math.max(rRange, gRange, bRange);
    let maxRangeChannel: ColorChannel = 'r';

    if (maxRange === gRange) maxRangeChannel = 'g';
    else if (maxRange === bRange) maxRangeChannel = 'b';

    const quantizedPixels = quantization(pixels, depth, maxRangeChannel);
    const channels: ColorChannel[] = ['r', 'g', 'b'];

    self.postMessage(
      quantizedPixels.map(p => '#' + channels.map(ch => p[ch].toString(16)).join(''))
    );
  };
};

const createWorker = (): [Worker, string] => {
  const blob = new Blob([`(${workerFunc.toString()})()`], { type: 'application/javascript' });

  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);

  return [worker, workerURL];
};

const useCoverPalette = (paletteConfig?: PaletteConfig): UseCoverPaletteReturn => {
  const { coverKey, colorCount, defaultPalette } = { ...DEFAULT_PALETTE_CONFIG, ...paletteConfig };
  const { currentTrack } = useAudio();

  if (!ALLOWED_COUNTS.includes(colorCount)) {
    throw new Error("'colorCount' must be either 1, 2, 4, 8, 16");
  }

  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    let worker: Worker;
    let workerURL: string;

    const cover = currentTrack[coverKey] as string;
    const hasDefaultPalette = Array.isArray(defaultPalette) && defaultPalette.length > 0;

    if (!cover) {
      if (!hasDefaultPalette) throw new Error(`Could not find '${coverKey}' in provided track`);

      setColors(defaultPalette);
      setLoading(false);
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = cover;

    const imageLoadHandler = () => {
      if (!context) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixelsData = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const depth = 4 - Math.log2(colorCount);

      [worker, workerURL] = createWorker();

      worker.postMessage({ depth, pixelsData });

      worker.onmessage = (e: MessageEvent<string[]>) => {
        setColors(e.data);
        setLoading(false);
      };
    };

    image.addEventListener('load', imageLoadHandler);

    return () => {
      image.removeEventListener('load', imageLoadHandler);
      image.remove();
      canvas.remove();

      if (worker) worker.terminate();
      if (workerURL) URL.revokeObjectURL(workerURL);
    };
  }, [currentTrack]);

  return [colors, loading];
};

export default useCoverPalette;
