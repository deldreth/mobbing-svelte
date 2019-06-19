export default function(stop) {
  const diff = stop - new Date().getTime();

  if (diff <= 0) {
    return ["00:00", 0];
  }

  const minutes = ((diff % (1000 * 60 * 60)) / (1000 * 60)) | 0;
  const seconds = ((diff % (1000 * 60)) / 1000) | 0;

  return [`${pad(minutes)}:${pad(seconds)}`, diff];
}

export function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function round(timestamp) {
  return ((timestamp / 1000) * 1000) | 0;
}
