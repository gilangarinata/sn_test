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
import CareerDetail from "@/components/landing/career/career_detail";
import {fetchNewsById} from "@/lib/actions/admin/news.action";
import {fetchCareerById} from "@/lib/actions/admin/career.action";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";

async function LandingPage({ params }: { params: { careerId: string } }) {
    var career = await fetchCareerById(params.careerId)
    return (
       <div className="h-full">
           <CareerDetail career={career?.news as CareerMdl} />
       </div>
    )
}

export default LandingPage;