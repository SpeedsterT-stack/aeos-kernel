import { createBase44Client } from "./base44.js";

const client = createBase44Client({
  appId: process.env.BASE44_APP_ID,
  apiKey: process.env.BASE44_API_KEY,
});

export async function runCycle() {
  console.log("🧠 AEOS cycle start");

  const res = await client.createEntity("SEOAuditLog", {
    description: "AEOS GitHub cycle",
    raw_output: JSON.stringify({
      seo: {},
      growth: {},
      pipeline: {},
    }),
  });

  console.log("✅ logged:", res.data);
}

runCycle().catch((err) => {
  console.error("❌ AEOS ERROR:", err);
  process.exit(1);
});
