"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";
import Video from "@/lib/models/video.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import Tag from "@/lib/models/tag.model";
interface Params {
    id: string,
    title: string,
    description: string,
    videoUrl: string,
}

export async function fetchAllVideos(pageNumber: number, pageSize: number,
                                   year?: number) {
    await connectToDb();
    try {
        const filters: any = {};

        if (year) {
            // Assuming you have a 'date' field in your news documents
            filters.createdAt = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
        }
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Video.find(filters)
            .skip(skipAmount)
            .limit(pageSize)


        const totalBannersCount = await Video.countDocuments();
        const banners = await bannersQuery.exec();

        const totalPages = Math.ceil(totalBannersCount / pageSize);

        return {
            banners,
            totalPages
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}

export async function fetchVideoById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = Video.findOne({id: id})
        // const totalBannersCount = await News.countDocuments();
        const news = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banner.length;
        return {
            news
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}


export async function updateVideo({
       id,
       title, description, videoUrl,
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await Video.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                description: description,
                videoUrl: videoUrl,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteVideo({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Video.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}