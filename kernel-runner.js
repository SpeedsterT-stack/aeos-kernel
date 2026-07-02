import { stabilize } from "./aeos/stabilizer.js";
import { trackEvent, trackError } from "./aeos/observability.js";

async function runCycle() {
  // simulate AEOS cycle
  trackEvent("cycle_start");

  // hier zou Base44 call zitten
  throw new Error("Simulated kernel failure");
}

async function main() {
  try {
    await runCycle();
  } catch (err) {
    trackError(err, { source: "kernel-runner" });

    const result = stabilize(err, {
      source: "kernel-runner",
    });

    console.log("🧠 STABILIZER RESULT:", result);
  }
}

main();
