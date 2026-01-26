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
  const contentType =
    response.headers.get("content-type") ?? "application/json";
  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie") ?? ""]
        : [];

  if (!response.ok) {
    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  }

  let payloadJson: {
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  } = {};
  try {
    payloadJson = JSON.parse(body) as {
      idToken?: string;
      refreshToken?: string;
      expiresAt?: number;
    };
  } catch {
    // Ignore parse errors; cookies may already be set via headers.
  }

  const headers = new Headers({
    "Content-Type": "application/json",
  });
  setCookies.filter(Boolean).forEach((cookie) => {
    headers.append("Set-Cookie", cookie);
  });

  const shouldUseSecureCookies = process.env.NODE_ENV === "production";
  const buildCookie = (name: string, value: string, maxAgeSeconds: number) => {
    const parts = [
      `${name}=${encodeURIComponent(value)}`,
      `Max-Age=${maxAgeSeconds}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
    ];
    if (shouldUseSecureCookies) {
      parts.push("Secure");
    }
    return parts.join("; ");
  };

  if (payloadJson.idToken) {
    const idMaxAge = payloadJson.expiresAt
      ? Math.max(1, payloadJson.expiresAt - Math.floor(Date.now() / 1000))
      : 3600;
    headers.append(
      "Set-Cookie",
      buildCookie("__Host-zalantha_id", payloadJson.idToken, idMaxAge),
    );
  }
  if (payloadJson.refreshToken) {
    headers.append(
      "Set-Cookie",
      buildCookie(
        "__Host-zalantha_refresh",
        payloadJson.refreshToken,
        60 * 60 * 24 * 30,
      ),
    );
  }

  return new Response(
    JSON.stringify({ ok: true, expiresAt: payloadJson.expiresAt }),
    {
      status: response.status,
      headers,
    },
  );
}
