const appId = process.env.BASE44_APP_ID;
const apiKey = process.env.BASE44_API_KEY;

console.log("🧠 AEOS START");
console.log("APP_ID:", appId ? "OK" : "MISSING");
console.log("API KEY:", apiKey ? "OK" : "MISSING");

// ❌ NIET hard crashen in dev/CI debugging
if (!appId || !apiKey) {
  console.warn("⚠️ Running in DRY MODE (no Base44)");
  // process.exit(0);  ← remove this strict crash
}
