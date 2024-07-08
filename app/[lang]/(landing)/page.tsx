import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import {fetchHome} from "@/lib/actions/landing/home.action";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";
import {OpenGraphMetadata} from "next/dist/lib/metadata/generate/opengraph";

export const metadata: Metadata = {
    title: 'Homepage',
    description: 'SESNA Group (PT Sumber Energi Surya Nusantara) adalah perusahaan energi terbarukan Indonesia yang berfokus pada pengembangan pembangkit listrik tenaga surya dan penyedia layanan Rekayasa, Pengadaan & Konstruksi',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Sesna",
        "Sesna Grup",
        "Beranda Perusahaan",
        "homepage sesna",
        "PT Sumber Energi Surya Nusantara",
        "pengembang proyek PLTS"
    ],
    openGraph: {
        url: new URL(`https://sesna.id`)
    }
}


async function LandingPage({params} : {params: { lang: Locale }}) {
    const data = await fetchHome()
    const dictionary = await getDictionary(params.lang)
    return (
       <div className="h-full">
           <HomeBanner banners={data.banners} lang={params.lang} dictionary={dictionary}/>
           <SesnaGroup experience={data.experiences} lang={params.lang} dictionary={dictionary} />
           <OurAchievement achievements={data.achievements} lang={params.lang} dictionary={dictionary}/>
           <SatisfiedCustomer customers={data.customers} lang={params.lang} dictionary={dictionary} />
           <Calculator dictionary={dictionary}/>
       </div>
    )
}

export default LandingPage;