import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    debug: true,
    publicRoutes: ["/","/media/(.*)", "/who-we-are","/our-business","/get-in-touch","/zero-capex","/career/(.*)","/career","/zero-capex-result"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};