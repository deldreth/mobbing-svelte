import { writable } from "svelte/store";

import { adjustTimer, preStartTimer } from "./utils";
import { displayNotification } from "../../utils/notifications";
import persistStore from "../../utils/persistStore";
import tick from "../../utils/tick";

typeof Notification !== "undefined" && Notification.requestPermission();

let timerWorker;
if (typeof Worker !== "undefined") {
  timerWorker = new Worker("timer-worker.js");
}

function createTimers() {
  const defaults = {
    version: 1,
    paused: false,
    remainder: 0,
    timer: "00:00",
    session: {
      label: "Session Time",
      value: 5,
      suffix: "minutes"
    },
    breakAfter: {
      label: "Break After",
      value: 10,
      suffix: "sessions"
    },
    breakDuration: {
      label: "Break Length",
      value: 10,
      suffix: "minutes"
    }
  };

  const { subscribe, set, update } = writable(defaults);

  const timerOpts = {
    resetTimer: false
  };

  let innerRef;
  subscribe(val => (innerRef = val));

  return {
    set,
    subscribe,
    start: async (teamId, onSessionDone, opts = timerOpts) => {
      const handleMessage = event => {
        update(timers => ({ ...timers, ...event.data }));

        if (event.data.remainder === 0) {
          displayNotification("Your time is up!");
          onSessionDone();

          timerWorker.removeEventListener("message", handleMessage);
        }
      };

      timerWorker.addEventListener("message", handleMessage);

      preStartTimer(update, "session", opts);
      timerWorker.postMessage({
        method: "timer",
        timers: innerRef,
        key: "session"
      });
    },
    break: (onBreakDone, opts = timerOpts) => {
      const handleMessage = event => {
        update(timers => ({ ...timers, ...event.data }));

        if (event.data.remainder === 0) {
          displayNotification("Break is over!");
          onBreakDone();

          timerWorker.removeEventListener("message", handleMessage);
        }
      };

      timerWorker.addEventListener("message", handleMessage);

      preStartTimer(update, "breakDuration", opts);
      timerWorker.postMessage({
        method: "timer",
        timers: innerRef,
        key: "breakDuration"
      });
    },
    pause: () => {
      update(timers => ({
        ...timers,
        paused: true
      }));

      timerWorker.postMessage({ method: "stop" });
    },
    increment: (key, value) => update(timers => adjustTimer(timers, key)),
    decrement: (key, value) => update(timers => adjustTimer(timers, key, -1))
  };
}

export const timers = persistStore(createTimers(), "timers");
