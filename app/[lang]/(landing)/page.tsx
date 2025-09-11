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
import StructuredData from "@/app/[lang]/(landing)/StructuredDate";

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
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://sesna.id/#org",
        name: "SESNA Group",
        legalName: "PT Sumber Energi Surya Nusantara",
        url: "https://sesna.id",
        logo: "https://sesna.id/logo.svg",
        description:
            "Indonesian renewable energy company focused on solar power (IPP, EPC, O&M).",
        email: "marketingsesna@s-energy.id",
        telephone: "+62-21-39711631",
        sameAs: [
            "https://www.instagram.com/sesnagroup/",
            "https://www.linkedin.com/company/sesna-energy/",
            "https://www.youtube.com/channel/UC8HVZOrh1oXcsql3lPdSzLA"
        ],
        address: {
            "@type": "PostalAddress",
            streetAddress:
                "World Trade Center 1, 5th Floor, Jl. Jend. Sudirman Kav. 29, Kuningan, Karet",
            addressLocality: "Setiabudi",
            addressRegion: "DKI Jakarta",
            postalCode: "12920",
            addressCountry: "ID"
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+62-851-5865-9911",
                areaServed: "ID"
            }
        ]
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://sesna.id/#website",
        url: "https://sesna.id",
        name: "SESNA Group",
        publisher: { "@id": "https://sesna.id/#org" }
        // Add SearchAction if you have site search:
        // potentialAction: {
        //   "@type": "SearchAction",
        //   target: "https://sesna.id/search?q={query}",
        //   "query-input": "required name=query"
        // }
    };



    const data = await fetchHome()
    const dictionary = await getDictionary(params.lang)
    return (
        <>
            <StructuredData id="org" data={organization}/>
            <StructuredData id="website" data={website}/>
            <div className="h-full">
                <HomeBanner banners={data.banners} lang={params.lang} dictionary={dictionary}/>
                <SesnaGroup experience={data.experiences} lang={params.lang} dictionary={dictionary}/>
                <OurAchievement achievements={data.achievements} lang={params.lang} dictionary={dictionary}/>
                <SatisfiedCustomer customers={data.customers} lang={params.lang} dictionary={dictionary}/>
                <Calculator dictionary={dictionary}/>
            </div>
        </>

    )
}

export default LandingPage;