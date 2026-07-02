import { logAEOS } from "./lib/logger.js";

export function trackEvent(name, payload = {}) {
  logAEOS("EVENT", name, payload);
}

export function trackError(error, context = {}) {
  logAEOS("ERROR", error.message, {
    stack: error.stack,
    context,
  });
}
