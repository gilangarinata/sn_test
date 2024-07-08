import {fetchHome} from "@/lib/actions/landing/home.action";
import {Banner} from "@/components/landing/who-we-are/banner";
import {Earth} from "@/components/earth";
import {Subsidiaries} from "@/components/landing/who-we-are/subsidiaries";
import {VisionMission} from "@/components/landing/who-we-are/vision";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";

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
    return (
       <div className="relative">
           <Earth />
           <Banner banner={whoWeAre.whoWeAre} lang={params.lang} dictionary={dictionary}/>
           <Subsidiaries subsidiaries={whoWeAre.subsidiaries} lang={params.lang} dictionary={dictionary}/>
           <VisionMission ourDna={whoWeAre.ourDna} visionMission={whoWeAre.whoWeAre} director={whoWeAre.whoWeAre} lang={params.lang} dictionary={dictionary} />
       </div>
    )
}

export default WhoWeArePage;