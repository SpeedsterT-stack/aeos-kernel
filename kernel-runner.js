console.log("🧠 AEOS START (TEST MODE)");

console.log("APP_ID exists:", !!process.env.BASE44_APP_ID);
console.log("API_KEY exists:", !!process.env.BASE44_API_KEY);

if (!process.env.BASE44_APP_ID || !process.env.BASE44_API_KEY) {
  throw new Error("❌ Missing BASE44 env vars");
}

const APP_ID = process.env.BASE44_APP_ID;
const API_KEY = process.env.BASE44_API_KEY;

console.log("APP_ID prefix:", APP_ID.slice(0, 6));

// 🔥 RAW TEST CALL (NO SDK)
import axios from "axios";

async function testBase44() {
  const url = `https://base44.app/api/apps/${APP_ID}/entities/SEOAuditLog`;

  console.log("Calling:", url);

  const res = await axios.post(
    url,
    {
      description: "AEOS TEST RUN",
      raw_output: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
      }),
    },
    {
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
        "X-App-Id": APP_ID,
      },
    }
  );

  console.log("✅ SUCCESS:", res.status);
  console.log(res.data);
}

testBase44().catch((err) => {
  console.error("❌ AEOS ERROR:", err.response?.data || err.message);
  process.exit(1);
});
