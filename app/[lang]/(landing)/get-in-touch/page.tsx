import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React, {useMemo} from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import {fetchHome} from "@/lib/actions/landing/home.action";
import OurBusinessBanner from "@/components/landing/our-business/banner";
import WhySolar from "@/components/landing/our-business/why-solar";
import SolarPowerWorks from "@/components/landing/our-business/solar-power-works";
import ScopeOfWork from "@/components/landing/our-business/scope-of-work";
import OurExperience from "@/components/landing/our-business/our-experience";
import GetInTouch from "@/components/landing/get-in-touch/get-in-touch";
import dynamic from "next/dynamic";
import LeafletMap from "@/components/landing/get-in-touch/map";
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