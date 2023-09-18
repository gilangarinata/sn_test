import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import '@fontsource/poppins';

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
        <html lang="en" /*className={poppins.className}*/>
          <body className={poppins.className}>{children}</body>
        </html>
      </ClerkProvider>
  )
}
