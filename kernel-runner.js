import { getBase44Client } from "./base44-client.js";

console.log("🧠 AEOS START");

const base44 = getBase44Client();

async function run() {
  const res = await base44.entities.create("SEOAuditLog", {
    description: "AEOS GitHub cycle",
    raw_output: JSON.stringify({
      seo: {},
      growth: {},
      pipeline: {},
    }),
  });

  console.log("✅ SUCCESS:", res);
}

run().catch((err) => {
  console.error("❌ AEOS ERROR:", err);
  process.exit(1);
});
