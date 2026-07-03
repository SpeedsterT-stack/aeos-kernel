import dotenv from "dotenv";

// FORCE correct env loading (NO dotenvx / no injection issues)
dotenv.config({ path: "./.env", override: true });

import { createBase44 } from "./aeos/baseClient.js";

console.log("🧠 AEOS START");
console.log("APP_ID:", process.env.BASE44_APP_ID);
console.log("API KEY length:", process.env.BASE44_API_KEY?.length || 0);

async function runCycle() {
  const client = createBase44();

  const payload = {
    description: "AEOS GitHub cycle",
    raw_output: JSON.stringify({
      seo: {},
      growth: {},
      pipeline: {},
    }),
  };

  return await client.entities.create("SEOAuditLog", payload);
}

// MAIN BOOT
(async () => {
  try {
    await runCycle();
  } catch (err) {
    console.error("❌ AEOS ERROR:", err);
    process.exit(1);
  }
})();
