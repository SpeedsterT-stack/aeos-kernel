import fs from "fs";

export function logAEOS(type, msg, data = null) {
  const line = {
    ts: new Date().toISOString(),
    type,
    msg,
    data,
  };

  fs.appendFileSync(
    "./aeos.log",
    JSON.stringify(line) + "\n"
  );

  console.log(`[AEOS:${type}]`, msg);
}
