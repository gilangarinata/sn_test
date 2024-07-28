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

function getFirst50Characters(blocks: PartialBlock[]): string {
    let result = "";
    let charCount = 0;

    for (const block of blocks) {
        // Assuming each block has a 'content' property that is a string
        const content = block.content as string;

        if (charCount + content.length >= 50) {
            result += content.slice(0, 50 - charCount);
            break;
        } else {
            result += content;
            charCount += content.length;
        }
    }

    return result;
}
export async function generateMetadata(
    { params }: {params: { id: string }},
): Promise<Metadata> {
    // read route params

    const news = await fetchNewsBySlug(params.id);
    const newsO = news?.news as News;
    const desc = JSON.parse(newsO?.content)


    return {
        title: newsO.title,
        description: desc[0].content[0].text,
        keywords: newsO.tags.map(e => e.tag),
        openGraph: {
            images: [newsO.image],
            url: new URL(`https://sesna.id/media/news/detail/${newsO.slug}`)
        },
        metadataBase: new URL(`https://sesna.id`),
        alternates: {
            canonical: './',
        },
    }
}
async function MediaPage ({ params }: { params: { id: string } }) {
    const news = await fetchNewsBySlug(params.id)
    return (
       <div className="h-full">
        <NewsDetail news={news?.news as News} />
       </div>
    )
}

export default MediaPage;