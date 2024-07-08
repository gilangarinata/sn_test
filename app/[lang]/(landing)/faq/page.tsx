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
import {fetchAllNews, fetchNewsById, fetchNewsBySlug} from "@/lib/actions/admin/news.action";
import {News} from "@/components/admin/media/news/news-table";
import {Metadata} from "next";
import {PartialBlock, PartialInlineContent} from "@blocknote/core";
import {fetchFooter} from "@/lib/actions/admin/footer.action";
import FaqDetail from "@/components/landing/faq/faq-detail";
import {translateText} from "@/lib/utils";
import {Locale} from "@/i18n.config";

async function MediaPage ({ params }: { params: { lang: Locale} }) {
    const news = await fetchFooter()
    return (
       <div className="h-full">
        <FaqDetail title="FAQ" content={news?.categories?.faq} />
       </div>
    )
}

export default MediaPage;