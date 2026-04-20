import NewsTable, {News} from "@/components/admin/media/news/news-table";
import {fetchAllNews, updateNewsSlugs} from "@/lib/actions/admin/news.action";
import UploadImageTable from "@/components/admin/media/upload-image/upload-image-table";
import ZeroCapexTable from "@/components/admin/zero-capex/zero-capex-table";
import ZeroCapexBannerSection from "@/components/admin/zero-capex/zero-capex-banner-section";


async function NewsPage() {
    // const news = await fetchAllNews(1, 1000);
    // const updateNews = await updateNewsSlugs();
    return (
        <div className="flex flex-col gap-4">
            <ZeroCapexTable />
        </div>
    )

}

export default NewsPage;