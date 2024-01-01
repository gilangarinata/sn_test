import NewsTable, {News} from "@/components/admin/media/news/news-table";
import {fetchAllNews} from "@/lib/actions/admin/news.action";


async function NewsPage() {
    const news = await fetchAllNews(1, 200);
    return (
        <div className="flex flex-col">
            <NewsTable newsA={news?.banners as News[]} />
        </div>
    )

}

export default NewsPage;