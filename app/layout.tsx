import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import '@fontsource/poppins';
import Head from "next/head";

import localFont from '@next/font/local'

const poppinsLocal = localFont({
    src: [
        {
            path: '../public/fonts/Poppins-Regular.ttf',
            weight: '400'
        },
        {
            path: '../public/fonts/Poppins-Bold.ttf',
            weight: '700'
        }
    ],
    variable: '--font-poppins'
})

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
        <html lang="en" className={`${poppinsLocal.variable} font-sans`} /*className={poppins.className}*/>
          <body /*className={poppins.className}*/>{children}</body>
        </html>
      </ClerkProvider>
  )
}
