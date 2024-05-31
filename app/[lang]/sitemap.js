import {MetadataRoute} from "next";
import {fetchAllNews} from "@/lib/actions/admin/news.action";
import {fetchAllVideos} from "@/lib/actions/admin/video.action";

export default async function sitemap() {
    const news = await fetchAllNews(1, 200)
    const video = await fetchAllVideos(1, 200)

    const staticss = [
        {
            url: "https://sesna.id",
            priority: 1
        },
        {
            url: "https://sesna.id/who-we-are",
        },
        {
            url: "https://sesna.id/our-business",
        },
        {
            url: "https://sesna.id/zero-capex",
        },
        {
            url: "https://sesna.id/career",
        },
        {
            url: "https://sesna.id/get-in-touch",
        },
        {
            url: "https://sesna.id/media/news",
        },
        {
            url: "https://sesna.id/media/video",
        }
    ]

    const newsSitemap = news?.banners?.map((product) => ({
        url: `https://sesna.id/media/news/detail/${product.slug}`,
    })) ?? [];

    const videossSitemap = video?.banners?.map((product) => ({
        url: `https://sesna.id/media/video/detail/${product._id}`,
    })) ?? [];

    return [...staticss, ...newsSitemap, ...videossSitemap]
}