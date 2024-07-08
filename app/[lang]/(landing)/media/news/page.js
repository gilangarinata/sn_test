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
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";

export const metadata = {
    title: 'Media',
    description: 'Temukan informasi dan edukasi terbarukan dari kami',
    metadataBase: new URL(`https://sesna.id`),
    alternates: {
        canonical: './',
    },
    keywords: [
        "Panel surya",
        "PLTS",
        "Energi Terbarukan"
    ],
    openGraph: {
        url: new URL(`https://sesna.id/media/news`)
    }
}

async function MediaPage({params}) {
    const categories = await fetchCategories("news")
    // const news = await fetchAllNews(3, 200)
    const dictionary = await getDictionary(params.lang)
    return (
       <div className="h-full">
           <NewsBanner image="" title="" lang={params.lang} dictionary={dictionary}/>
           <NewsContent categories={categories?.categories} lang={params.lang} dictionary={dictionary}/>
       </div>
    )
}
export default MediaPage;