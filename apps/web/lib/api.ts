export async function proxyToAI(path: string, payload: unknown) {
  const endpoint = process.env.AI_SERVICE_URL;
  if (!endpoint) {
    return Response.json({ error: "AI_SERVICE_URL is not configured" }, { status: 500 });
  }

  const response = await fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await response.json();
  return Response.json(json, { status: response.status });
}
