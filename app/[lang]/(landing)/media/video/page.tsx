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
import {fetchAllNews} from "@/lib/actions/admin/news.action";
import {News} from "@/components/admin/media/news/news-table";
import {fetchCategories} from "@/lib/actions/admin/news-category.action";
import {Category} from "@/components/admin/media/category/category-table";
import VideoContent from "@/components/landing/media/video/video-content";
import {fetchAllVideos} from "@/lib/actions/admin/video.action";
import {Video} from "@/components/admin/media/video/video-table";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Media',
    description: 'Dapatkan informasi seputar acara, podcast, dan proyek terbaru dari kami',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Video",
        "sesna",
        "event sesna",
        "acara sesna",
        "podcast sesna",
        "proyek plts sesna",
        "portofolio plts sesna"
    ],
    openGraph: {
        url: new URL(`https://sesna.id/media/video`)
    }

}
async function MediaPage({params, searchParams} : {params: { lang: Locale }, searchParams?: { category?: string }}) {
    const categoryName = searchParams?.category;
    const video = await fetchAllVideos(1, 2000, undefined, undefined, categoryName);
    const categories = await fetchCategories("video");
    const dictionary = await getDictionary(params.lang);
    
    return (
        <div className="h-full">
            <VideoContent 
                categoryName={categoryName} 
                categories={categories?.categories ?? []} 
                videos={video?.banners as Video[]} 
                lang={params.lang} 
                dictionary={dictionary} 
            />
        </div>
    );
}

export default MediaPage;