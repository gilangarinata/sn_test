import '@/app/globals.css'
import type { Metadata } from 'next'
import {LandingNavBar} from "@/components/landing-navbar";
import FooterLanding from "@/components/footer-landing";
import 'react-fancy-circular-carousel/FancyCarousel.css';
import Script from "next/script";


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
        <main className="w-full">
            <div className="container">
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-EM5J07JC7L" />
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
              <LandingNavBar />
              <div className="flex flex-col">
                  {children}
                  <FooterLanding />
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