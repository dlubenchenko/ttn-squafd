export async function fetchWithRetry(url: string, options?: RequestInit, retries = 2, delay = 1000): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        if (i < retries) await new Promise(r => setTimeout(r, delay));
        else throw new Error("Too Many Requests (429)");
      } else {
        return res;
      }
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error("Failed after retries");
}