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
    title: 'SESNA Group | Zero Capex',
    description: 'Kami secara khusus memberi Anda desain yang tidak memerlukan biaya Investasi atau Nol Belanja Modal (Belanja Modal) Memungkinkan Anda mengalokasikan biaya selama jangka waktu kontrak proyek energi surya, memberikan fleksibilitas mode dalam penganggaran dan manajemen arus kas',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
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