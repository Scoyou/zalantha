const idTokenCookieName = "__Host-zalantha_id";
const refreshTokenCookieName = "__Host-zalantha_refresh";

const shouldUseSecureCookies = process.env.NODE_ENV === "production";

const buildExpiredCookie = (name: string) =>
  `${name}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${
    shouldUseSecureCookies ? "; Secure" : ""
  }`;

export async function POST() {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  headers.append("Set-Cookie", buildExpiredCookie(idTokenCookieName));
  headers.append("Set-Cookie", buildExpiredCookie(refreshTokenCookieName));
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  });
}
