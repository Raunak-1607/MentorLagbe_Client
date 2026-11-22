import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPath = pathname.toLowerCase();

  // Root "/AllTuition" is public (all tuition posts), but details pages like "/AllTuition/[id]" are protected
  if (lowerPath === "/alltuition" || lowerPath === "/alltuition/") {
    return NextResponse.next();
  }

  // Check for Better Auth session cookies
  // Better Auth uses: "better-auth.session_token", "__Secure-better-auth.session_token", etc.
  const allCookies = request.cookies.getAll();
  const hasSession = allCookies.some(
    (c) =>
      (c.name.includes("session_token") || c.name.includes("session_data")) &&
      Boolean(c.value && c.value.trim() !== "")
  );

  if (!hasSession) {
    const signInUrl = new URL("/SignIn", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/AllTuition/:path*",
  ],
};
