import 'dotenv/config';

console.log("🧠 AEOS START");

const APP_ID = process.env.BASE44_APP_ID;
const API_KEY = process.env.BASE44_API_KEY;

console.log("APP_ID:", APP_ID ? "OK" : "MISSING");
console.log("API_KEY:", API_KEY ? "OK" : "MISSING");

if (!APP_ID || !API_KEY) {
  throw new Error("Missing BASE44 env vars");
}

// Base44 client
import { createClient } from '@base44/sdk';

const base44 = createClient({
  appId: APP_ID,
  headers: {
    api_key: API_KEY
  }
});

export async function runCycle() {
  console.log("🚀 AEOS CYCLE START");

  const res = await base44.entities.create("SEOAuditLog", {
    description: "AEOS GitHub cycle",
    raw_output: JSON.stringify({
      seo: {},
      growth: {},
      pipeline: {}
    })
  });

  console.log("✅ CREATED:", res);
}

runCycle().catch((err) => {
  console.error("❌ AEOS ERROR:", err);
  process.exit(1);
});
