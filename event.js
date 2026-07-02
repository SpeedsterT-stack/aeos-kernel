import { emit } from "./aeos/eventBus.js";

export const EventType = {
  EVENT: "EVENT",
  ERROR: "ERROR",
  AUTO_FIX: "AUTO_FIX",
  SYSTEM: "SYSTEM",
};

export function createEvent(type, name, payload = {}) {
  return {
    id: crypto.randomUUID?.() || String(Date.now()),
    ts: new Date().toISOString(),
    type,
    name,
    payload,
  };
}

// AUTO EMIT HOOK (belangrijk)
export function sendEvent(type, name, payload) {
  const event = createEvent(type, name, payload);
  emit(event);
  return event;
}
