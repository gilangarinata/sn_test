import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import ZeroCapexBanner from "@/components/landing/zero-capex/zero-capex-banner";
import HistungInvestasi from "@/components/landing/zero-capex/hitung-investasi";
import {fetchZeroCapexBanners} from "@/lib/actions/admin/zero-capex-banner.action";
import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import {Metadata} from "next";
import StructuredData from "@/app/[lang]/(landing)/StructuredDate";

export const metadata: Metadata = {
    title: 'Sesna Zero Capex',
    description: 'Sesna secara khusus memberikan anda skema pembayaran yang tidak memerlukan biaya investasi atau skema zero capex',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Solar leasing",
        "solar rental",
        "zero capex"
    ],
    openGraph: {
        url: new URL(`https://sesna.id/zero-capex`)
    }
}
async function WhoWeArePage({params} : {params: { lang: Locale }}) {
    const dictionary = await getDictionary(params.lang)

    // If you have localized routes, adjust these URLs accordingly.
    const base = "https://sesna.id";
    const pageUrl = `${base}/zero-capex`;

    // Reference your Organization entity by @id (make sure the org JSON-LD exists on your site root)
    const orgId = `${base}/#org`;

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        serviceType: "Zero Capex (Solar Leasing / PPA)",
        alternateName: ["Solar Leasing", "Solar Rental", "Power Purchase Agreement"],
        provider: { "@id": orgId },
        areaServed: "ID",
        category: "RenewableEnergy",
        url: pageUrl,
        description:
            "Skema Zero Capex dari SESNA untuk pembangkit listrik tenaga surya tanpa biaya investasi awal—bayar berdasarkan energi yang digunakan.",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Zero Capex / PPA Options",
            itemListElement: [
                { "@type": "Offer", name: "Rooftop PV PPA" },
                { "@type": "Offer", name: "Ground-mounted PV PPA" },
                { "@type": "Offer", name: "Hybrid PV + BESS PPA" },
            ],
        },
    };

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "SESNA Zero Capex",
        inLanguage: params.lang || "id",
        description:
            "Program Zero Capex SESNA: solusi PLTS tanpa biaya investasi awal (leasing/PPA) untuk bisnis di Indonesia.",
        isPartOf: { "@type": "WebSite", "@id": `${base}/#website` },
        about: { "@id": `${pageUrl}#service` },
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: base },
            { "@type": "ListItem", position: 2, name: "Zero Capex", item: pageUrl },
        ],
    };


    const bannersData = await fetchZeroCapexBanners();


    return (
       <div className="relative">
           {/* JSON-LD blocks */}
           <StructuredData id="sd-service-zero-capex" data={serviceJsonLd} />
           <StructuredData id="sd-webpage-zero-capex" data={webPageJsonLd} />
           <StructuredData id="sd-breadcrumbs-zero-capex" data={breadcrumbsJsonLd} />

           <ZeroCapexBanner lang={params.lang} dictionary={dictionary} banners={bannersData?.banners} />
           <HistungInvestasi lang={params.lang} dictionary={dictionary}/>
       </div>
    )
}

export default WhoWeArePage;