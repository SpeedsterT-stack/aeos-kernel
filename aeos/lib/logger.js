import fs from "fs";

export function logAEOS(msg) {
  fs.appendFileSync(
    "./aeos.log",
    `[${new Date().toISOString()}] ${msg}\n`
  );
}
