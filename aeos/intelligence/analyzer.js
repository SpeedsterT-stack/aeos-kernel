export function analyzeError(err) {
  const status = err?.status;

  if (status === 422) {
    return {
      type: "SCHEMA_ERROR",
      severity: "HIGH",
      action: "AUTO_FIX_PAYLOAD"
    };
  }

  if (status === 403) {
    return {
      type: "PERMISSION_ERROR",
      severity: "CRITICAL",
      action: "CHECK_BASE44_PERMISSIONS"
    };
  }

  if (status === 404) {
    return {
      type: "NOT_FOUND",
      severity: "HIGH",
      action: "CHECK_APP_ID_OR_ENTITY"
    };
  }

  return {
    type: "UNKNOWN",
    severity: "MEDIUM",
    action: "LOG_ONLY"
  };
}
