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

async function MediaPage({params} : {params: { lang: Locale }}) {
    const categories = await fetchCategories("news")
    const news = await fetchAllNews(1, 200)
    const dictionary = await getDictionary(params.lang)
    return (
       <div className="h-full">
           <NewsBanner image="" title="" lang={params.lang} dictionary={dictionary}/>
           <NewsContent newsA={news?.banners as News[]} categories={categories?.categories as Category[]} lang={params.lang} dictionary={dictionary}/>
       </div>
    )
}

export default MediaPage;