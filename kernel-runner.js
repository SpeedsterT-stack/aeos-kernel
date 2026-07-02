import dotenv from "dotenv";
dotenv.config();

import { createBase44 } from "./aeos/baseClient.js";
import { createSEOAuditLog } from "./aeos/loggers.js";
import { trackRun, getStats } from "./aeos/observability.js";

async function runCycle() {
  const base44 = createBase44();
  const logSEOAudit = createSEOAuditLog(base44);

  const start = Date.now();

  try {
    console.log("🧠 AEOS START");

    const result = {
      seo: {},
      growth: {},
      pipeline: {}
    };

    await logSEOAudit({
      description: "AEOS GitHub cycle",
      raw_output: result
    });

    const duration = Date.now() - start;

    trackRun({
      status: "success",
      duration
    });

    console.log("✅ CYCLE OK");
    console.log("📊 stats:", getStats());
  } catch (err) {
    const duration = Date.now() - start;

    trackRun({
      status: "error",
      error: err.message,
      duration
    });

    console.error("❌ AEOS ERROR:", err);
    console.log("📊 stats:", getStats());

    process.exit(1);
  }
}

runCycle();
