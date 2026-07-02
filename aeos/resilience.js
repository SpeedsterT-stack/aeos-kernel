export async function withRetry(fn, retries = 3) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }

  throw lastError;
}

export function circuitBreaker(fn, threshold = 5) {
  let failures = 0;

  return async (...args) => {
    if (failures >= threshold) {
      throw new Error("Circuit breaker OPEN");
    }

    try {
      const result = await fn(...args);
      failures = 0;
      return result;
    } catch (err) {
      failures++;
      throw err;
    }
  };
}
