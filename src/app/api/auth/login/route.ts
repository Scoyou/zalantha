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

  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  const headers = new Headers({
    "Content-Type": response.headers.get("content-type") ?? "application/json",
  });
  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie") ?? ""]
        : [];
  setCookies.filter(Boolean).forEach((cookie) => {
    headers.append("Set-Cookie", cookie);
  });

  return new Response(body, {
    status: response.status,
    headers,
  });
}
