import { emit } from "./observability.js";

export function stabilize(error, context = {}) {
  const result = {
    action: "none",
    severity: "unknown",
  };

  // 422 → schema issue
  if (error?.status === 422 || error?.message?.includes("audit_date")) {
    result.action = "schema_fix_required";
    result.severity = "high";

    emit({
      type: "AUTO_FIX",
      name: "schemaDoctor_trigger",
      payload: { error, context },
    });

    return result;
  }

  // 403 → permissions
  if (error?.status === 403) {
    result.action = "permission_check_required";
    result.severity = "high";

    emit({
      type: "AUTO_FIX",
      name: "permission_analyzer",
      payload: { error, context },
    });

    return result;
  }

  // fallback
  result.action = "manual_review";
  result.severity = "medium";

  return result;
}
