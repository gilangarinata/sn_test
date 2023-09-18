import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
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