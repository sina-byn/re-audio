import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

//* utils
import { quantization } from '../utils';

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

type PaletteConfig = {
  coverKey?: string;
  colorCount?: number;
};

type UseCoverPaletteReturn = [string[], Dispatch<SetStateAction<string[]>>];

const useCoverPalette = (paletteConfig?: PaletteConfig): UseCoverPaletteReturn => {
  const { coverKey, colorCount } = { ...DEFAULT_PALETTE_CONFIG, ...paletteConfig };
  const { currentTrack } = useAudio();

  if (!ALLOWED_COUNTS.includes(colorCount)) {
    throw new Error("'colorCount' must be either 1, 2, 4, 8, 16");
  }

  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const cover = currentTrack[coverKey] as string;
    if (!cover) throw new Error(`Could not find '${coverKey}' in provided track`);

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

      const depth = 4 - Math.log2(colorCount);
      const quantizedPixels = quantization(pixels, depth, maxRangeChannel);
      const channels: ColorChannel[] = ['r', 'g', 'b'];

      setColors(quantizedPixels.map(p => '#' + channels.map(ch => p[ch].toString(16)).join('')));
    };

    image.addEventListener('load', imageLoadHandler);

    return () => {
      image.removeEventListener('load', imageLoadHandler);
      image.remove();
      canvas.remove();
    };
  }, [currentTrack]);

  return [colors, setColors];
};

export default useCoverPalette;
