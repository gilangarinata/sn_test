import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@fontsource/poppins';
import Head from "next/head";
import {ClerkProvider} from "@clerk/nextjs";
import "../globals.css"
import {Locale} from "@/i18n.config";
// import {ClerkProvider} from "@clerk/nextjs";

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Sesna Group',
  description: ''
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
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                />
                <title>SESNA Group</title>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "SESNA Group",
                        "url": "https://sesna.id/"
                    })
                }} />
            </Head>
          <body className={poppins.className}>{children}</body>
        </html>
       </ClerkProvider>
  )
}
