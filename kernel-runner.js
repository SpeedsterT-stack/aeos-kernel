import { trackEvent, trackError } from "./aeos/observability.js";
import { stabilize } from "./aeos/stabilizer.js";

async function runCycle() {
  trackEvent("cycle_start");

  // simulate work
  const random = Math.random();

  if (random < 0.6) {
    throw new Error("Simulated 422 schema failure: audit_date missing");
  }

  trackEvent("cycle_success", { score: random });
}

async function main() {
  try {
    await runCycle();
  } catch (err) {
    trackError(err, { source: "kernel" });

    const result = stabilize(err, {
      source: "kernel-runner",
    });

    console.log("🧠 STABILIZER:", result);

    trackEvent("cycle_recovered", result);
  }
}

setInterval(main, 5000);
