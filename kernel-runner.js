import 'dotenv/config';
import { createClient } from '@base44/sdk';

console.log("🧠 AEOS SCHEMA-AWARE KERNEL START");

const APP_ID = process.env.BASE44_APP_ID;
const API_KEY = process.env.BASE44_API_KEY;

if (!APP_ID || !API_KEY) {
  throw new Error("Missing BASE44 env vars");
}

console.log("APP_ID:", APP_ID);
console.log("API KEY length:", API_KEY.length);

// Base44 client
const base44 = createClient({
  appId: APP_ID,
  headers: {
    api_key: API_KEY
  }
});

/**
 * 🧠 SIMPLE SCHEMA INTROSPECTION LAYER
 * (Base44 geeft niet altijd schema API, dus we bouwen defensieve layer)
 */
async function getEntitySchema(entityName) {
  console.log(`🔍 Fetching schema for: ${entityName}`);

  // fallback schema (wat jij al ontdekt hebt)
  const knownSchemas = {
    SEOAuditLog: {
      required: ["audit_date"],
      defaults: {
        audit_date: () => new Date().toISOString()
      }
    }
  };

  return knownSchemas[entityName] || {
    required: [],
    defaults: {}
  };
}

/**
 * 🧠 AUTO FIELD INJECTOR
 */
async function buildPayload(entityName, payload) {
  const schema = await getEntitySchema(entityName);

  const finalPayload = { ...payload };

  // inject required defaults
  for (const field of schema.required) {
    if (finalPayload[field] === undefined || finalPayload[field] === null) {
      if (schema.defaults?.[field]) {
        finalPayload[field] = schema.defaults[field]();
        console.log(`✨ Auto-filled ${field}`);
      } else {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  return finalPayload;
}

/**
 * 🚀 SAFE CREATE WRAPPER
 */
async function safeCreate(entityName, payload) {
  const safePayload = await buildPayload(entityName, payload);

  console.log("📦 Final payload:", safePayload);

  return await base44.entities.create(entityName, safePayload);
}

/**
 * 🚀 MAIN CYCLE
 */
async function runCycle() {
  console.log("🚀 AEOS CYCLE START");

  try {
    const res = await safeCreate("SEOAuditLog", {
      description: "AEOS GitHub cycle",
      raw_output: JSON.stringify({
        seo: {},
        growth: {},
        pipeline: {}
      })
    });

    console.log("✅ CREATED:", res);

  } catch (err) {
    console.error("❌ AEOS ERROR:", err?.data || err);
    process.exit(1);
  }
}

runCycle();
