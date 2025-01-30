import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routsurl } from "./utils/routs";

const isProtectedRoutes = createRouteMatcher([routsurl.about]);
const isPublicRoute = createRouteMatcher([routsurl.signIn, routsurl.signUp,routsurl.factorTwo]);
const isAdminRoute = createRouteMatcher([routsurl.admin]);
export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId && isProtectedRoutes(request)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn();
  }
  if (userId && isPublicRoute(request)) {
    return NextResponse.redirect(new URL(routsurl.about, request.url));
  }
  if (
    isAdminRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL(routsurl.home, request.url);
    return NextResponse.redirect(url);
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
