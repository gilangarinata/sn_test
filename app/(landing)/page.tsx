import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import {fetchHome} from "@/lib/actions/landing/home.action";

async function LandingPage() {
    const data = await fetchHome()
    return (
       <div className="h-full">
           <HomeBanner banners={data.banners}/>
           <SesnaGroup experience={data.experiences} />
           <OurAchievement achievements={data.achievements} />
           <SatisfiedCustomer customers={data.customers} />
           <Calculator />
       </div>
    )
}

export default LandingPage;