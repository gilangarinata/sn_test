// import { authMiddleware } from "@clerk/nextjs";
//
// export default authMiddleware({
//     debug: true,
//     publicRoutes: ["/","/media/(.*)","/media/(.*)", "/who-we-are","/our-business","/get-in-touch","/zero-capex","/career/(.*)","/career","/zero-capex-result","/admin-panel/(.*)"]
// });

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}