import fs from "fs";

export class AEOSStabilizer {
  constructor(client) {
    this.client = client;
  }

  // 1. ENV GUARD (voorkomt 403/404 door misconfig)
  static validateEnv() {
    const appId = process.env.BASE44_APP_ID;
    const apiKey = process.env.BASE44_API_KEY;

    if (!appId || appId.length < 10) {
      throw new Error("❌ INVALID BASE44_APP_ID");
    }

    if (!apiKey || apiKey.length < 10) {
      throw new Error("❌ INVALID BASE44_API_KEY");
    }

    console.log("✅ ENV OK");
  }

  // 2. SCHEMA GUARD (voorkomt 422)
  static validateSEOAuditLog(payload) {
    const required = ["description", "raw_output", "audit_date"];

    for (const field of required) {
      if (!payload[field]) {
        throw new Error(`❌ SCHEMA ERROR: Missing ${field}`);
      }
    }

    return true;
  }

  // 3. SAFE EXECUTOR (retry + logging)
  async safeCreateSEOAuditLog(payload) {
    AEOSStabilizer.validateSEOAuditLog(payload);

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        console.log(`🧠 AEOS attempt ${attempts + 1}`);

        const result = await this.client.entities.SEOAuditLog.create(payload);

        console.log("✅ SUCCESS");
        return result;
      } catch (err) {
        attempts++;

        console.error("❌ ERROR:", err?.message || err);

        if (attempts >= maxAttempts) {
          console.error("💀 FINAL FAILURE AFTER RETRIES");
          throw err;
        }

        await new Promise(r => setTimeout(r, 1000 * attempts));
      }
    }
  }
}
