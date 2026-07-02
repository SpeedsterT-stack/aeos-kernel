import { sendEvent, EventType } from "./event.js";
import { on } from "./aeos/eventBus.js";

console.log("🔥 AEOS EVENT SYSTEM START");

on("EVENT", (e) => {
  console.log("📡 EVENT RECEIVED:", e);
});

sendEvent(EventType.EVENT, "test", { ok: true });
