import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";
import StructuredData from "@/app/[lang]/(landing)/StructuredDate";

export const revalidate = 300; // ISR: re-generate every 5 minutes

export const metadata: Metadata = {
    title: 'Who We Are',
    description: 'Sesna adalah perusahaan yang bergerak di bidang energi terbarukan yang berfokus pada pengembangan panel surya.',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Tentang kami",
        "Company profile sesna",
        "profil perusahaan sesna"
    ],
    openGraph: {
        url: new URL(`https://sesna.id/who-we-are`)
    }
}
async function WhoWeArePage({params} : {params: { lang: Locale }}) {
    const whoWeAre = await fetchWhoWeAre()
    const dictionary = await getDictionary(params.lang)

    const base = "https://sesna.id";
    const pageUrl = `${base}/who-we-are`;
    const orgId = `${base}/#org`; // make sure your Organization JSON-LD on the homepage uses this @id

    // Map subsidiaries to Organization items if available
    const subsidiaryOrgs =
        whoWeAre?.subsidiaries?.map((s: any) => ({
            "@type": "Organization",
            name: s?.name ?? undefined,
            url: s?.url ?? undefined,
            logo: s?.logo ?? undefined,
        }))?.filter((x: any) => x.name) ?? [];

    const aboutPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${pageUrl}#about`,
        url: pageUrl,
        name: "Who We Are – SESNA",
        inLanguage: params.lang || "id",
        description:
            "Profil SESNA sebagai perusahaan energi terbarukan di Indonesia yang berfokus pada pengembangan panel surya.",
        isPartOf: { "@type": "WebSite", "@id": `${base}/#website` },
        primaryImageOfPage: `${base}/og-image.png`, // replace if you have a specific hero image
        about: { "@id": orgId },
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: base },
            { "@type": "ListItem", position: 2, name: "Who We Are", item: pageUrl },
        ],
    };

    // Optional: enrich your Organization with subsidiaries
    const organizationJsonLd =
        subsidiaryOrgs.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": orgId,
                subOrganization: subsidiaryOrgs,
            }
            : null;


    return (
       <div className="relative">
           <StructuredData id="sd-about-who-we-are" data={aboutPageJsonLd} />
           <StructuredData id="sd-breadcrumbs-who-we-are" data={breadcrumbsJsonLd} />
           {organizationJsonLd && (
               <StructuredData id="sd-org-subsidiaries" data={organizationJsonLd} />
           )}

           <Earth />
           <Banner banner={whoWeAre.whoWeAre} lang={params.lang} dictionary={dictionary}/>
           <Subsidiaries subsidiaries={whoWeAre.subsidiaries} lang={params.lang} dictionary={dictionary}/>
           <VisionMission ourDna={whoWeAre.ourDna} visionMission={whoWeAre.whoWeAre} director={whoWeAre.whoWeAre} lang={params.lang} dictionary={dictionary} />
       </div>
    )
}

export default WhoWeArePage;