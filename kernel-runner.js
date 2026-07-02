import "dotenv/config";
import { createClient } from "@base44/sdk";
import { AEOSStabilizer } from "./aeos/stabilizer.js";

// ENV check FIRST (hard fail early)
AEOSStabilizer.validateEnv();

const base44 = createClient({
  appId: process.env.BASE44_APP_ID,
  headers: {
    api_key: process.env.BASE44_API_KEY,
  },
});

const stabilizer = new AEOSStabilizer(base44);

console.log("🧠 AEOS START");

async function runCycle() {
  const payload = {
    description: "AEOS GitHub cycle",
    raw_output: JSON.stringify({
      seo: {},
      growth: {},
      pipeline: {},
    }),
    audit_date: new Date().toISOString(),
  };

  const result = await stabilizer.safeCreateSEOAuditLog(payload);

  console.log("📦 RESULT:", result);
}

runCycle().catch((err) => {
  console.error("❌ AEOS CRASH:", err);
});
