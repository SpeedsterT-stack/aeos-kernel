export function createSEOAuditLog(base44) {
  return async function logSEOAudit(data = {}) {
    return base44.entities.SEOAuditLog.create({
      description: data.description ?? "AEOS cycle",
      raw_output: JSON.stringify(data.raw_output ?? {}),
      audit_date: data.audit_date ?? new Date().toISOString()
    });
  };
}
