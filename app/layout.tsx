import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import '@fontsource/poppins';
import Head from "next/head";


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
            {/* link your fonts here */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
        </Head>
          <body className={poppins.className}>{children}</body>
        </html>
      </ClerkProvider>
  )
}
