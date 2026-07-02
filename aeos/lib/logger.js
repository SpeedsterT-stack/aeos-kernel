import fs from "fs";

export function logAEOS(type, msg, data = {}) {
  const entry = {
    ts: new Date().toISOString(),
    type,
    msg,
    data,
  };

  fs.appendFileSync(
    "./aeos.log",
    JSON.stringify(entry) + "\n"
  );

  console.log(`[AEOS:${type}]`, msg);
}
