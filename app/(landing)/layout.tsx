import '@/app/globals.css'
import type { Metadata } from 'next'
import {LandingNavBar} from "@/components/landing-navbar";
import FooterLanding from "@/components/footer-landing";


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
        <main className="w-screen">
          <div className="mx-auto h-full">
              <LandingNavBar />
              <div className="flex flex-col">
                  {children}
                  <FooterLanding />
              </div>
          </div>
        </main>
  )
}
