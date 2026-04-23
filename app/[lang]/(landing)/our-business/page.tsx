import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import {fetchHome} from "@/lib/actions/landing/home.action";
import OurBusinessBanner from "@/components/landing/our-business/banner";
import WhySolar from "@/components/landing/our-business/why-solar";
import SolarPowerWorks from "@/components/landing/our-business/solar-power-works";
import ScopeOfWork from "@/components/landing/our-business/scope-of-work";
import OurExperience from "@/components/landing/our-business/our-experience";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import {fetchOurBusiness} from "@/lib/actions/landing/our-business.action";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";
import StructuredData from "@/app/[lang]/(landing)/StructuredDate";

import FilteredContent from "@/components/landing/our-business/filtered-content";
import ProjectMap from "@/components/landing/our-business/project-map";
import { fetchMapProjects } from "@/lib/actions/admin/map-project.action";

export const metadata: Metadata = {
    title: 'Our Business',
    description: "Sebagai perusahaan energi terbarukan yang berfokus pada pengembangan panel surya, kami melayani solusi lengkap mulai dari penyewaan sistem tenaga surya, instalasi dan konstruksi, perencanaan dan rekayasa sistem, manajemen proyek, pemilihan komponen dan tekonlogi, serta operasi dan pemeliharaan.",
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Bisnis perusahaan",
        "Layanan perusahaan sesna",
        "sesna",
        "sesna group"
    ],
    openGraph: {
        url: new URL(`https://sesna.id/our-business`)
    }
}

async function LandingPage({ params, searchParams }: { 
    params: { lang: Locale }, 
    searchParams: { category?: string } 
}) {
    const ourBusiness = await fetchOurBusiness()
    const dictionary = await getDictionary(params.lang)
    const selectedCategory = searchParams.category || null;
    const mapProjectsData = await fetchMapProjects();
    const mapProjects = JSON.parse(JSON.stringify(mapProjectsData.projects || []));

    const base = "https://sesna.id";
    const pageUrl = `${base}/our-business`;
    const orgId = `${base}/#org`; // reference to your main Organization schema

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        serviceType: "Solar Energy Solutions",
        provider: { "@id": orgId },
        areaServed: "ID",
        category: "RenewableEnergy",
        url: pageUrl,
        description:
            "SESNA menyediakan solusi energi surya menyeluruh: EPC (Engineering, Procurement & Construction), O&M (Operation & Maintenance), IPP (Independent Power Producer), solar leasing (Zero Capex), serta konsultasi dan manajemen proyek.",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "SESNA Solar Solutions",
            itemListElement: [
                { "@type": "Offer", name: "Solar Leasing (Zero Capex)" },
                { "@type": "Offer", name: "EPC (Engineering, Procurement & Construction)" },
                { "@type": "Offer", name: "Operation & Maintenance" },
                { "@type": "Offer", name: "IPP (Independent Power Producer)" },
                { "@type": "Offer", name: "Project Management & Consulting" },
            ],
        },
    };

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Our Business – SESNA",
        inLanguage: params.lang || "id",
        description:
            "Layanan bisnis SESNA mencakup EPC, O&M, IPP, Zero Capex, dan solusi energi surya lainnya di Indonesia.",
        isPartOf: { "@type": "WebSite", "@id": `${base}/#website` },
        about: { "@id": `${pageUrl}#service` },
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: base },
            { "@type": "ListItem", position: 2, name: "Our Business", item: pageUrl },
        ],
    };

    return (
        <div className="h-full">
            {/* JSON-LD blocks */}
            <StructuredData id="sd-service-our-business" data={serviceJsonLd} />
            <StructuredData id="sd-webpage-our-business" data={webPageJsonLd} />
            <StructuredData id="sd-breadcrumbs-our-business" data={breadcrumbsJsonLd} />

            <OurBusinessBanner banner={ourBusiness.banner} lang={params.lang} dictionary={dictionary} />
            <WhySolar whySolar={ourBusiness.whySolar} lang={params.lang} dictionary={dictionary} />
            <SolarPowerWorks solarPowerWorks={ourBusiness.solarPowerWorks} lang={params.lang} dictionary={dictionary} />
            <ScopeOfWork scopeOfWork={ourBusiness.scopeOfWork} lang={params.lang} dictionary={dictionary} />
            <OurExperience ourExperience={ourBusiness.ourExperience} lang={params.lang} dictionary={dictionary} activeCategory={selectedCategory}/>
            <ProjectMap projects={mapProjects} />
            <FilteredContent category={selectedCategory} lang={params.lang} dictionary={dictionary} />
        </div>
    )
}

export default LandingPage;