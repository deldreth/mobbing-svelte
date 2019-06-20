function tick(stop) {
  const diff = stop - new Date().getTime();

  if (diff <= 0) {
    return ["00:00", 0];
  }

  const minutes = ((diff % (1000 * 60 * 60)) / (1000 * 60)) | 0;
  const seconds = ((diff % (1000 * 60)) / 1000) | 0;

  return [`${pad(minutes)}:${pad(seconds)}`, diff];
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function round(timestamp) {
  return ((timestamp / 1000) * 1000) | 0;
}

let tInterval;

onmessage = function(e) {
  const {
    data: { method, timers, key }
  } = e;

  switch (method) {
    case "timer":
      let offset;
      const stop = new Date().getTime();

      tInterval = setInterval(() => {
        if (!offset) {
          offset = stop + timers[key].value * 60 * 1000;

          if (timers.remainder > 0) {
            offset = stop + timers.remainder;
          }
        }

        const [timer, remainder] = tick(offset);

        if (remainder === 0) {
          clearInterval(tInterval);
        }

        postMessage({ timer, remainder });
      }, 100);
      break;
    case "stop":
      clearInterval(tInterval);
  }
};
