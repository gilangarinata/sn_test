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
import {News} from "@/components/admin/media/news/news-table";
import {fetchAllVideos, fetchVideoById} from "@/lib/actions/admin/video.action";
import VideoDetail from "@/components/landing/media/video/video-detail";
import {Video} from "@/components/admin/media/video/video-table";

async function MediaPage ({ params }: { params: { videoId: string } }) {
    const news = await fetchVideoById(params.videoId)

    return (
       <div className="h-full">
        <VideoDetail news={news?.news as Video} />
       </div>
    )
}

export default MediaPage;