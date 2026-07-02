export const EventType = {
  EVENT: "EVENT",
  ERROR: "ERROR",
  AUTO_FIX: "AUTO_FIX",
  SYSTEM: "SYSTEM",
};

export function createEvent(type, name, payload = {}) {
  return {
    id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
    ts: new Date().toISOString(),
    type,
    name,
    payload,
  };
}
