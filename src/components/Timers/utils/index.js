import { pad } from "../../../utils/tick";

export function preStartTimer(update, key, opts) {
  update(timers => {
    let { timer, remainder } = timers;

    if (opts.resetTimer) {
      timer = `${pad(timers[key].value)}:00`;
      remainder = timers[key].value * 60 * 1000;
    } else {
      timer = remainder > 0 ? timer : `${timers[key].value}:00`;
    }

    return {
      ...timers,
      timer,
      remainder,
      paused: false
    };
  });
}

export function adjustTimer(timers, key, adjustment = 1) {
  return {
    ...timers,
    [key]: {
      ...timers[key],
      value: (timers[key].value += adjustment)
    }
  };
}
