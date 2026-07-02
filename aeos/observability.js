import { logAEOS } from "../lib/logger.js";

const subscribers = [];

export function emit(event) {
  logAEOS(event.type, event.name, event.payload);

  for (const fn of subscribers) {
    fn(event);
  }
}

export function subscribe(fn) {
  subscribers.push(fn);
}

export function trackEvent(name, payload = {}) {
  emit({
    type: "EVENT",
    name,
    payload,
  });
}

export function trackError(error, context = {}) {
  emit({
    type: "ERROR",
    name: error?.message || "unknown_error",
    payload: {
      stack: error?.stack,
      context,
    },
  });
}
