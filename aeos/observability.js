const memory = {
  runs: [],
  events: []
};

export function trackRun(run) {
  const enriched = {
    ...run,
    timestamp: new Date().toISOString()
  };

  memory.runs.push(enriched);
  memory.events.push({ type: "run", data: enriched });

  if (memory.runs.length > 1000) memory.runs.shift();
}

export function emitEvent(type, data) {
  memory.events.push({
    type,
    data,
    timestamp: new Date().toISOString()
  });

  if (memory.events.length > 5000) memory.events.shift();
}

export function getStats() {
  const total = memory.runs.length;
  const failed = memory.runs.filter(r => r.status === "error").length;

  return {
    totalRuns: total,
    failedRuns: failed,
    successRate: total ? ((total - failed) / total * 100).toFixed(2) : 0
  };
}

export function getRecentRuns(limit = 10) {
  return memory.runs.slice(-limit).reverse();
}
