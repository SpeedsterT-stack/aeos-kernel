import { logAEOS } from "./lib/logger.js";

export function stabilize(error, context = {}) {
  logAEOS("ERROR", error.message || "unknown error", {
    stack: error.stack,
    context,
  });

  // BASIC AUTO-HEAL RULES (v1)
  if (error?.status === 422) {
    return {
      action: "schema_fix_required",
      fix: "missing_fields_detected",
    };
  }

  if (error?.status === 403) {
    return {
      action: "permission_issue",
      fix: "check_base44_permissions",
    };
  }

  return {
    action: "unknown",
    fix: "manual_review_required",
  };
}
