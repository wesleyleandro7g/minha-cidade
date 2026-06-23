import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  TENANT_HEADER,
  PATHNAME_HEADER,
  isReservedSegment,
} from "@/lib/tenant/constants";

/**
 * Edge proxy (formerly "middleware"). Resolves the tenant slug from the first
 * path segment, injects it as a request header for Server Components, and
 * refreshes the Supabase auth session.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  // Propagate the resolved tenant slug + pathname to Server Components via
  // request headers. The layout validates the tenant and renders 404 if it
  // does not exist (defense in depth alongside RLS).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, pathname);
  if (!isReservedSegment(firstSegment)) {
    requestHeaders.set(TENANT_HEADER, firstSegment);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Refresh the Supabase auth session (no-op when Supabase isn't configured).
  return updateSession(request, response);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and image optimization files.
     */
    "/((?!_next/static|_next/image|favicon.ico|icons|images|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$).*)",
  ],
};
