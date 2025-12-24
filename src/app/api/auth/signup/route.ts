const getAuthApiBaseUrl = () =>
  (process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "").replace(/\/+$/, "");

export async function POST(request: Request) {
  const baseUrl = getAuthApiBaseUrl();
  if (!baseUrl) {
    return new Response(
      JSON.stringify({ message: "Auth API base URL is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const payload = await request.json();

  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
