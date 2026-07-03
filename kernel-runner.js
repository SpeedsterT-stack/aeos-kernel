import { startWSServer } from "./kernel/wsServer.js";
import { sendEvent, EventType } from "./event.js";

startWSServer(8080);

console.log("🔥 AEOS KERNEL STARTED");

setInterval(() => {
  sendEvent(EventType.EVENT, "kernel_tick", {
    cpu: Math.random(),
    memory: Math.random()
  });
}, 2000);
