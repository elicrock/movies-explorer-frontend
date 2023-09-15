export const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours > 0 ? hours + 'ч ' : '0ч '}${minutes > 0 ? minutes + 'м' : '0м'}`
}