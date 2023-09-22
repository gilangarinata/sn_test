import {LandingNavBar} from "@/components/landing-navbar";
import HomeBanner from "@/components/landing/home/home-banner";
import SesnaGroup from "@/components/landing/home/sesna-group";
import OurAchievement from "@/components/landing/home/our-achievement";
import SatisfiedCustomer from "@/components/landing/home/satisfied-customer";
import React from "react";
import Calculator from "@/components/landing/home/calculator";
import FooterLanding from "@/components/footer-landing";
import NewsBanner from "@/components/landing/media/news/news-banner";
import NewsContent from "@/components/landing/media/news/news-content";
import NewsDetail from "@/components/landing/media/news/news-detail";
import {fetchAllNews, fetchNewsById} from "@/lib/actions/admin/news.action";
import {News} from "@/components/admin/home/news/news-table";

async function MediaPage ({ params }: { params: { id: string } }) {
    const news = await fetchNewsById(params.id)


    return (
       <div className="h-full">
        <NewsDetail news={news?.news as News} />
       </div>
    )
}

export default MediaPage;