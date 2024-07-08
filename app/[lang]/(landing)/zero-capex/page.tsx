import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import ZeroCapexBanner from "@/components/landing/zero-capex/zero-capex-banner";
import HistungInvestasi from "@/components/landing/zero-capex/hitung-investasi";
import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import {Metadata} from "next";

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
    return (
       <div className="relative">
           <ZeroCapexBanner lang={params.lang} dictionary={dictionary} />
           <HistungInvestasi lang={params.lang} dictionary={dictionary}/>
       </div>
    )
}

export default WhoWeArePage;