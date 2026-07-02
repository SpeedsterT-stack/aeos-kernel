const listeners = {};

export function on(eventType, handler) {
  if (!listeners[eventType]) {
    listeners[eventType] = [];
  }
  listeners[eventType].push(handler);
}

export function emit(event) {
  const handlers = listeners[event.type] || [];

  for (const handler of handlers) {
    try {
      handler(event);
    } catch (err) {
      console.error("Event handler error:", err);
    }
  }
}

export function clear() {
  Object.keys(listeners).forEach(k => delete listeners[k]);
}
