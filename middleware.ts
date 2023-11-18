import {authMiddleware, redirectToSignIn} from "@clerk/nextjs";
import {NextResponse} from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated

        const orgSelection = new URL('/admin-panel', req.url)
        return NextResponse.redirect(orgSelection)

        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        // redirect them to organization selection page
        if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-selection"){
            const orgSelection = new URL('/org-selection', req.url)
            return NextResponse.redirect(orgSelection)
        }
    },
    publicRoutes: ["/","/media/(.*)","/media/(.*)", "/who-we-are","/our-business","/get-in-touch","/zero-capex","/career/(.*)","/career","/zero-capex-result"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};