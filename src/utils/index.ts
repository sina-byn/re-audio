// * types
type TimeChunk = string | number;

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
