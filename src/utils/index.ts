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
