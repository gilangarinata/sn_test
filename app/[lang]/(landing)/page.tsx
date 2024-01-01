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

async function LandingPage({params} : {params: { lang: Locale }}) {
    const data = await fetchHome()
    const dictionary = await getDictionary(params.lang)
    return (
       <div className="h-full">
           <HomeBanner banners={data.banners} lang={params.lang} dictionary={dictionary}/>
           <SesnaGroup experience={data.experiences} lang={params.lang} dictionary={dictionary} />
           <OurAchievement achievements={data.achievements} />
           <SatisfiedCustomer customers={data.customers} />
           <Calculator />
       </div>
    )
}

export default LandingPage;