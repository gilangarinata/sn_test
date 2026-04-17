import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@fontsource/poppins';
import Script from "next/script";
import {ClerkProvider} from "@clerk/nextjs";
import "../globals.css"
import {Locale} from "@/i18n.config";

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Sesna Group',
  description: '',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: ['Sesna', 'Sesna Group'],
}

export default function RootLayout({
  children,
    params
}: {
  children: React.ReactNode,
    params: { lang: Locale }
}) {
  return (
      <ClerkProvider>
        <html lang={params.lang}>
            <head>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KRQVWTLH');
                    `}
                </Script>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                />
            </head>
          <body className={poppins.className}>
            <noscript>
                <iframe 
                    src="https://www.googletagmanager.com/ns.html?id=GTM-KRQVWTLH"
                    height="0" 
                    width="0" 
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>
            {children}
          </body>
        </html>
       </ClerkProvider>
  )
}
