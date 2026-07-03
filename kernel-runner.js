import fs from "fs";
import { createBase44 } from "./aeos/baseClient.js";

console.log("🧠 AEOS START (RAW ENV MODE)");

// 🔥 HARD LOAD .env (bypasses ANY injector)
function loadEnv() {
  const raw = fs.readFileSync("./.env", "utf-8");

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").trim();

    process.env[key.trim()] = value;
  }
}

loadEnv();

// DEBUG
console.log("APP_ID:", process.env.BASE44_APP_ID);
console.log("API KEY length:", process.env.BASE44_API_KEY?.length);

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

try {
  await runCycle();
} catch (err) {
  console.error("❌ AEOS ERROR:", err);
  process.exit(1);
}
