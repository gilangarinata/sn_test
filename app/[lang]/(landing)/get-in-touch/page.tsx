import React, {useMemo} from "react";
import GetInTouch from "@/components/landing/get-in-touch/get-in-touch";
import dynamic from "next/dynamic";
import MyMap from "@/components/landing/get-in-touch/map";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
const Map = dynamic(() => import('@/components/landing/get-in-touch/map'), {
    ssr: false,
})


async function LandingPage({params} : {params: { lang: Locale }}) {
    const dictionary = await getDictionary(params.lang)
    const position = [-6.215140,106.820515]

    return (
        <div>
            <GetInTouch lang={params.lang} dictionary={dictionary}/>
            <MyMap position={position} zoom={13} lang={params.lang} dictionary={dictionary} />

        </div>

    )
}

export default LandingPage;