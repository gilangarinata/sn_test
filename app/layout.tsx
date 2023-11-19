import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@fontsource/poppins';
import Head from "next/head";
import {ClerkProvider} from "@clerk/nextjs";
// import {ClerkProvider} from "@clerk/nextjs";

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Sesna',
  description: 'Sesna description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                />
            </Head>
          <body className={poppins.className}>{children}</body>
        </html>
       </ClerkProvider>
  )
}
