import { Base44 } from "@base44/sdk";

export function createBase44() {
  const appId = process.env.BASE44_APP_ID;
  const apiKey = process.env.BASE44_API_KEY;

  if (!appId || !apiKey) {
    console.log("ENV DEBUG:", {
      appId,
      apiKeyLength: apiKey?.length,
    });

    throw new Error("Missing BASE44 env vars");
  }

  return new Base44({
    appId,
    apiKey,
  });
}
