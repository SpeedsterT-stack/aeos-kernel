import { createClient } from "@base44/sdk";

const base44 = createClient({
  appId: process.env.BASE44_APP_ID,
  headers: {
    api_key: process.env.BASE44_API_KEY
  }
});

async function runCycle() {
  try {
    console.log("🧠 AEOS cycle start");

    if (!process.env.BASE44_API_KEY) {
      throw new Error("Missing API KEY");
    }

    const seo = await base44.agents.seo_architect.run({});
    const growth = await base44.agents.growth_architect.run({});
    const pipeline = await base44.agents.pipeline_watchdog.run({});

    await base44.entities.SEOAuditLog.create({
      description: "AEOS GitHub cycle",
      raw_output: JSON.stringify({ seo, growth, pipeline })
    });

    console.log("✅ cycle done");
  } catch (e) {
    console.error("❌ AEOS ERROR:", e);
    process.exit(1);
  }
}

runCycle();
