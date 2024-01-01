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
import ScopeOfWork from "@/components/landing/our-business/scope-of-work";
import OurExperience from "@/components/landing/our-business/our-experience";
import {fetchWhoWeAre} from "@/lib/actions/landing/who-we-are.action";
import {fetchOurBusiness} from "@/lib/actions/landing/our-business.action";
import CareerBanner from "@/components/landing/career/career_banner";
import CareerContent from "@/components/landing/career/career_content";

async function LandingPage() {
    return (
       <div className="h-full">
           <CareerBanner />
           <CareerContent />
       </div>
    )
}

export default LandingPage;