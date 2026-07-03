import { broadcast } from "../kernel/wsServer.js";

const listeners = {};

export function on(eventType, handler) {
  if (!listeners[eventType]) listeners[eventType] = [];
  listeners[eventType].push(handler);
}

export function emit(event) {
  const handlers = listeners[event.type] || [];

  // local handlers
  for (const h of handlers) {
    try { h(event); } catch (e) { console.error(e); }
  }

  // 🌐 realtime stream to dashboard
  broadcast(event);
}

export function clear() {
  Object.keys(listeners).forEach(k => delete listeners[k]);
}
