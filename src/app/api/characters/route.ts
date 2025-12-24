const getCharacterApiBaseUrl = () =>
  (process.env.NEXT_PUBLIC_CHARACTER_API_BASE_URL ?? "").replace(/\/+$/, "");

const jsonError = (message: string, status = 500) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const forwardHeaders = (request: Request) => {
  const headers = new Headers();
  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    headers.set("Authorization", authHeader);
  }
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }
  return headers;
};

export async function GET(request: Request) {
  const baseUrl = getCharacterApiBaseUrl();
  if (!baseUrl) {
    return jsonError("Character API base URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/characters`, {
    headers: forwardHeaders(request),
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function PUT(request: Request) {
  const baseUrl = getCharacterApiBaseUrl();
  if (!baseUrl) {
    return jsonError("Character API base URL is not configured.");
  }

  const payload = await request.text();

  const response = await fetch(`${baseUrl}/characters`, {
    method: "PUT",
    headers: forwardHeaders(request),
    body: payload,
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
