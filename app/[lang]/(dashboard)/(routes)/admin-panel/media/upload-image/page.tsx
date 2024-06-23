import NewsTable, {News} from "@/components/admin/media/news/news-table";
import {fetchAllNews, updateNewsSlugs} from "@/lib/actions/admin/news.action";
import UploadImageTable from "@/components/admin/media/upload-image/upload-image-table";


async function NewsPage() {
    // const news = await fetchAllNews(1, 1000);
    // const updateNews = await updateNewsSlugs();
    return (
        <div className="flex flex-col">
            <UploadImageTable />
        </div>
    )

}

export default NewsPage;