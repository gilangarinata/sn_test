import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {LandingNavBar} from "@/components/landing-navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sesna',
  description: 'Sesna website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main className="h-full overflow-auto">
          <div className="mx-auto h-full">
            <LandingNavBar />
            {children}
          </div>
        </main>
  )
}
