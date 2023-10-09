import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import {fetchHome} from "@/lib/actions/landing/home.action";
import OurBusinessBanner from "@/components/landing/our-business/banner";
import WhySolar from "@/components/landing/our-business/why-solar";
import SolarPowerWorks from "@/components/landing/our-business/solar-power-works";

async function LandingPage() {
    return (
       <div className="h-full">
           <OurBusinessBanner />
           <WhySolar />
           <SolarPowerWorks />
       </div>
    )
}

export default LandingPage;