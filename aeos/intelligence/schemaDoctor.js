export function schemaDoctor(error, payload) {
  const msg = error?.data?.message || "";

  const fixed = { ...payload };

  // Fix: missing audit_date (jouw eerdere issue)
  if (msg.includes("audit_date")) {
    fixed.audit_date = new Date().toISOString();
  }

  // Generic fallback safety
  if (!fixed.description) {
    fixed.description = "AEOS auto-healed cycle";
  }

  if (!fixed.raw_output) {
    fixed.raw_output = {};
  }

  return fixed;
}
