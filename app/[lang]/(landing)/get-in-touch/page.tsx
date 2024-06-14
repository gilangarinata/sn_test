import React, {useMemo} from "react";
import GetInTouch from "@/components/landing/get-in-touch/get-in-touch";
import dynamic from "next/dynamic";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";
const Map = dynamic(() => import('@/components/landing/get-in-touch/map'), {
    ssr: false,
})
export const metadata: Metadata = {
    title: 'SESNA Group | Get In Touch',
    description: 'Apakah Anda bersemangat untuk membentuk masa depan yang berkelanjutan? Baik Anda memiliki proyek yang menarik atau sedang menjelajahi peluang untuk berkolaborasi, jangan ragu untuk menghubungi kami!',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    }

}
async function LandingPage({params} : {params: { lang: Locale }}) {
    const dictionary = await getDictionary(params.lang)
    const position = [-6.215140,106.820515]

    return (
        <div>
            <GetInTouch lang={params.lang} dictionary={dictionary}/>
            <Map position={position} zoom={13} lang={params.lang} dictionary={dictionary} />
        </div>

    )
}

export default LandingPage;