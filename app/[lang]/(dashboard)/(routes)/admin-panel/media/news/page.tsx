import NewsTable, {News} from "@/components/admin/media/news/news-table";
import {fetchAllNews, updateNewsSlugs} from "@/lib/actions/admin/news.action";


async function NewsPage() {
    const news = await fetchAllNews(1, 1000);
    // const updateNews = await updateNewsSlugs();
    return (
        <div className="flex flex-col">
            <NewsTable news={news?.banners as News[]} />
        </div>
    )

}

export default NewsPage;