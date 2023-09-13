import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/home/home-banner";
import SesnaGroup from "@/components/home/sesna-group";
import OurAchievement from "@/components/home/our-achievement";
import SatisfiedCustomer from "@/components/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/home/calculator";
import FooterLanding from "@/components/footer-landing";

const LandingPage = () => {
    return (
       <div className="h-full">
           <HomeBanner/>
           <SesnaGroup />
           <OurAchievement />
           <SatisfiedCustomer />
           <Calculator />
       </div>
    )
}

export default LandingPage;