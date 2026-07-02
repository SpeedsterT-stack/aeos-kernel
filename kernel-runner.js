import dotenv from "dotenv";
dotenv.config();

import { createBase44 } from "./aeos/baseClient.js";
import { createSEOAuditLog } from "./aeos/loggers.js";
import { trackRun, getStats, emitEvent } from "./aeos/observability.js";
import { withRetry } from "./aeos/resilience.js";

import { analyzeError } from "./aeos/intelligence/analyzer.js";
import { schemaDoctor } from "./aeos/intelligence/schemaDoctor.js";

async function runCycle() {
  const base44 = createBase44();
  const logSEOAudit = createSEOAuditLog(base44);

  const start = Date.now();

  console.log("🧠 AEOS AUTONOMOUS v2 START");

  let payload = {
    description: "AEOS autonomous cycle",
    raw_output: {
      seo: {},
      growth: {},
      pipeline: {}
    }
  };

  try {
    const safeWrite = withRetry(() => logSEOAudit(payload));

    await safeWrite();

    trackRun({
      status: "success",
      duration: Date.now() - start
    });

    console.log("✅ SUCCESS");
    console.log(getStats());
  } catch (err) {
    const analysis = analyzeError(err);

    emitEvent("error_analysis", analysis);

    console.log("🧠 ERROR ANALYZED:", analysis);

    // AUTO HEAL LOOP
    if (analysis.action === "AUTO_FIX_PAYLOAD") {
      payload = schemaDoctor(err, payload);

      console.log("🔧 AUTO-HEALED PAYLOAD:", payload);

      try {
        await logSEOAudit(payload);

        trackRun({
          status: "self-healed-success",
          duration: Date.now() - start
        });

        console.log("🟢 SELF-HEALED SUCCESS");
        return;
      } catch (secondErr) {
        console.error("❌ SELF-HEAL FAILED:", secondErr.message);
      }
    }

    trackRun({
      status: "error",
      error: err.message,
      duration: Date.now() - start
    });

    console.error("❌ FINAL FAIL:", err.message);
  }
}

runCycle();
