export class SchemaDoctor {
  static healSEOAuditLog(payload) {
    return {
      description: payload.description || "auto-healed AEOS cycle",
      raw_output: payload.raw_output || JSON.stringify({}),
      
      // 🔥 AUTO FIX missing field
      audit_date: payload.audit_date || new Date().toISOString(),

      // optional future-safe fields
      status: payload.status || "healthy",
    };
  }
}
