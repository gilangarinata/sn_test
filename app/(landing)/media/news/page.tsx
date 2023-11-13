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

async function MediaPage() {
    const categories = await fetchCategories("news")

    return (
       <div className="h-full">
           <NewsBanner image="" title="" />
           <NewsContent categories={categories?.categories as Category[]} />
       </div>
    )
}

export default MediaPage;