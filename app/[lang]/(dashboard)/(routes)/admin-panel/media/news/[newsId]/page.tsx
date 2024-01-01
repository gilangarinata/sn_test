import NewsTable, {News} from "@/components/admin/media/news/news-table";
import {fetchAllNews, fetchNewsById} from "@/lib/actions/admin/news.action";
import AddEditNews from "@/components/admin/media/news/edit-news";
import React from "react";


async function NewsPage({ params }: { params: { newsId: string } }) {
    const news = await fetchNewsById(params.newsId);
    return (
        <div className="flex flex-col">
            <AddEditNews achievement={news?.news as News} />
        </div>
    )

}

export default NewsPage;