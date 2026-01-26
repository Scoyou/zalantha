import { cookies } from "next/headers";

const idTokenCookieName = "__Host-zalantha_id";

const decodeJwtPayload = (token: string) => {
  const payload = token.split(".")[1];
  if (!payload) {
    return null;
  }
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  try {
    const json = Buffer.from(padded, "base64").toString("utf-8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export async function GET() {
  const token = cookies().get(idTokenCookieName)?.value;
  if (!token) {
    return new Response(JSON.stringify({ message: "Not authenticated." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.sub !== "string") {
    return new Response(JSON.stringify({ message: "Invalid token." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      userId: payload.sub,
      email: typeof payload.email === "string" ? payload.email : undefined,
      name: typeof payload.name === "string" ? payload.name : undefined,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
