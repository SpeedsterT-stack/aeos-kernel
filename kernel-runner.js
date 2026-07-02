import { createClient } from "@base44/sdk";

const appId = process.env.BASE44_APP_ID?.trim();
const apiKey = process.env.BASE44_API_KEY?.trim();

if (!appId || !apiKey) {
  throw new Error("Missing BASE44 env vars");
}

const base44 = createClient({
  appId,
  apiKey
});

async function runCycle() {
  try {
    console.log("🧠 AEOS START");

    console.log("APP_ID:", appId);
    console.log("API KEY length:", apiKey.length);

    const seo = await base44.agents.seo_architect?.run?.({}) ?? {};
    const growth = await base44.agents.growth_architect?.run?.({}) ?? {};
    const pipeline = await base44.agents.pipeline_watchdog?.run?.({}) ?? {};

    await base44.entities.SEOAuditLog.create({
      description: "AEOS GitHub cycle",
      raw_output: JSON.stringify({ seo, growth, pipeline })
    });

    console.log("✅ AEOS DONE");

  } catch (err) {
    console.error("❌ AEOS ERROR:", err);
    process.exit(1);
  }
}

runCycle();
