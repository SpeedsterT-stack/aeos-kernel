const memory = {
  runs: []
};

export function trackRun(run) {
  memory.runs.push({
    ...run,
    timestamp: new Date().toISOString()
  });

  if (memory.runs.length > 1000) {
    memory.runs.shift();
  }
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
