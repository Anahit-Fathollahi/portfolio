// lib/fetchLogger.ts
export function enableFetchLogger() {
  const originalFetch = global.fetch;

  global.fetch = async (...args: Parameters<typeof fetch>) => {
    const [resource, options] = args;
    console.log("[SERVER FETCH] URL:", resource, "Options:", options);
    const response = await originalFetch(...args);
    console.log("[SERVER FETCH] Response status:", response.status);
    return response;
  };
}
