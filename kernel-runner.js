import dotenv from "dotenv";
dotenv.config();

import { createBase44 } from "./aeos/baseClient.js";
import { createSEOAuditLog } from "./aeos/loggers.js";
import { trackRun, getStats, emitEvent } from "./aeos/observability.js";
import { withRetry } from "./aeos/resilience.js";

async function runCycle() {
  const base44 = createBase44();
  const logSEOAudit = createSEOAuditLog(base44);

  const start = Date.now();

  console.log("🧠 AEOS AUTONOMOUS START");

  try {
    const payload = {
      description: "AEOS autonomous cycle",
      raw_output: {
        seo: {},
        growth: {},
        pipeline: {}
      }
    };

    const safeCreate = withRetry(() => logSEOAudit(payload));

    const result = await safeCreate();

    emitEvent("db_write", { success: true, result });

    trackRun({
      status: "success",
      duration: Date.now() - start
    });

    console.log("✅ SUCCESS");
    console.log("📊", getStats());
  } catch (err) {
    emitEvent("error", {
      message: err.message,
      stack: err.stack
    });

    trackRun({
      status: "error",
      error: err.message,
      duration: Date.now() - start
    });

    console.error("❌ FAILED:", err.message);
    console.log("📊", getStats());

    process.exit(1);
  }
}

runCycle();
