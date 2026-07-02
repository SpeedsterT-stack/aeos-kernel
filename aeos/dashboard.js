import http from "http";
import { getStats, getRecentRuns } from "./observability.js";

const server = http.createServer((req, res) => {
  if (req.url === "/stats") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(getStats(), null, 2));
  }

  if (req.url === "/runs") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(getRecentRuns(25), null, 2));
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("AEOS Control Plane Running\n/endpoints: /stats /runs");
});

server.listen(3000, () => {
  console.log("📊 AEOS Dashboard running on http://localhost:3000");
});
