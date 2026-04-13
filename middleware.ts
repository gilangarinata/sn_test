import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {i18n} from '@/i18n.config'

import {match as matchLocale} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    // const locales: string[] = i18n.locales
    // const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

    const locales: string[] = i18n.locales;
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    if (languages.length === 1 && languages[0] === "*") {
        languages = ["en"];
    }

    console.log("getLocaleshh")
    console.log({languages, locales})
    return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Auth and RBAC
    const isAdminPanel = pathname.includes('/admin-panel');
    const sessionCookie = request.cookies.get('admin-session')?.value;
    let session: any = null;
    if (sessionCookie) {
        try {
            session = JSON.parse(sessionCookie);
        } catch (e) {}
    }

    if (isAdminPanel) {
        if (!session) {
            const locale = getLocale(request) || i18n.defaultLocale;
            return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        }

        // HR can only access Career page
        if (session.role === 'hr') {
            const isCareerPage = pathname.includes('/admin-panel/career');
            if (!isCareerPage) {
                const locale = getLocale(request) || i18n.defaultLocale;
                return NextResponse.redirect(new URL(`/${locale}/admin-panel/career`, request.url));
            }
        }
        
        // Activity logs should only be accessible by Marketing and IT
        if (pathname.includes('/admin-panel/activity-log')) {
             if (session.role !== 'marketing' && session.role !== 'it') {
                 const locale = getLocale(request) || i18n.defaultLocale;
                 return NextResponse.redirect(new URL(`/${locale}/admin-panel`, request.url));
             }
        }
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        if(locale === i18n.defaultLocale) {
            return NextResponse.rewrite(
                new URL(
                    `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                    request.url
                )
            )
        }

        return NextResponse.rewrite(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemapdeb.xml|robots.txt|images).*)']
}