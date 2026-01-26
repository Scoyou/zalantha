import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "www.zalantha.com";
const redirectHosts = new Set(["zalantha.com"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host && redirectHosts.has(host)) {
    const url = new URL(request.url);
    url.host = canonicalHost;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
