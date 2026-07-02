import fs from "fs";
import { subscribe } from "./observability.js";

export function startDashboardStream() {
  subscribe((event) => {
    fs.appendFileSync(
      "./dashboard-stream.json",
      JSON.stringify(event) + "\n"
    );
  });
}
