export default function shuffle(arr) {
  const cpy = arr.slice(0); // copy array to avoid in position mutation

  for (let i = cpy.length - 1; i > 0; i--) {
    const x = (Math.random() * (i + 1)) | 0;
    [cpy[i], cpy[x]] = [cpy[x], cpy[i]];
  }

  return cpy;
}
