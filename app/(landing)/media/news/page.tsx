import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/home/home-banner";
import SesnaGroup from "@/components/home/sesna-group";
import OurAchievement from "@/components/home/our-achievement";
import SatisfiedCustomer from "@/components/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/home/calculator";
import FooterLanding from "@/components/footer-landing";
import NewsBanner from "@/components/media/news/news-banner";
import NewsContent from "@/components/media/news/news-content";

const MediaPage = () => {
    return (
       <div className="h-full">
           <NewsBanner />
           <NewsContent />
       </div>
    )
}

export default MediaPage;