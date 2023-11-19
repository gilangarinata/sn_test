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
import {fetchAllNews, fetchNewsByCategory} from "@/lib/actions/admin/news.action";
import {News} from "@/components/admin/media/news/news-table";
import {fetchCategories, fetchCategory} from "@/lib/actions/admin/news-category.action";
import {Category} from "@/components/admin/media/category/category-table";
import {fetchAllVideos} from "@/lib/actions/admin/video.action";
import VideoContent from "@/components/landing/media/video/video-content";
import {Video} from "@/components/admin/media/video/video-table";

async function MediaPage({ params }: { params: { categoryId: string } }) {
    const video = await fetchAllVideos(1,2000, params.categoryId)
    const videos = video?.banners as Video[]
    //filter by category

    const categories = await fetchCategories("video")
    return (
        <div className="h-full">
            <VideoContent categoryId={params.categoryId} categories={categories?.categories ?? []} videos={videos}  />
        </div>
    )
}

export default MediaPage;