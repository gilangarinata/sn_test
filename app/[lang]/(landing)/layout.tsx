import '@/app/globals.css'
import type {Metadata} from 'next'
import {LandingNavBar} from "@/components/landing-navbar";
import FooterLanding from "@/components/footer-landing";
import 'react-fancy-circular-carousel/FancyCarousel.css';
import Script from "next/script";
import {i18n} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import QontakWebChat from "@/components/QontakWebChat";
import {Helmet} from "react-helmet";
import Head from "next/head";

export const metadata: Metadata = {
    title: 'Sesna',
    description: 'Sesna website',
}

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({lang: locale}))
}

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode,
    params: { lang: Locale }
}) {

    const dictionary = await getDictionary(params.lang)

    return (
        <main className="w-full">
            <QontakWebChat />
            <meta name="google-site-verification" content="6y-KyjbdApsSaEAFXmZa2mYLgzhyV1rAOq4dpUfhfu8"/>
            <div className="container">
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-EM5J07JC7L"/>
                <Script id="google-analytics">
                    {`
                       window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-EM5J07JC7L');
                    `}
                </Script>
            </div>
            <div className="mx-auto h-full">
                <LandingNavBar dictionary={dictionary}/>

                <div className="flex flex-col">
                    {children}
                    <FooterLanding/>
                </div>
            </div>
        </main>
    )
}


// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-EM5J07JC7L"></script>
// <script>
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//
//     gtag('config', 'G-EM5J07JC7L');
// </script>