import { createClient } from "@base44/sdk";

export function createBase44() {
  const appId = process.env.BASE44_APP_ID;
  const apiKey = process.env.BASE44_API_KEY;

  if (!appId || !apiKey) {
    throw new Error("Missing BASE44 env vars");
  }

  return createClient({
    appId,
    headers: {
      api_key: apiKey
    }
  });
}
