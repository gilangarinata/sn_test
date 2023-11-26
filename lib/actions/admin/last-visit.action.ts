"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";
import Video from "@/lib/models/video.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import Tag from "@/lib/models/tag.model";
import LastVisit from "@/lib/models/last-visit.model";
export async function fetchLastVisit() {
    await connectToDb();
    try {
        const bannersQuery = LastVisit.findOne()
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


export async function updateLastVisitCareer(): Promise<void> {
    await connectToDb();
    try {

        await LastVisit.findOneAndUpdate(
            {id: "last-visit"},
            {
                last_visit_career: Date.now(),
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}

export async function updateLastVisitGetInTouch(): Promise<void> {
    await connectToDb();
    try {

        await LastVisit.findOneAndUpdate(
            {id: "last-visit"},
            {
                last_visit_get_in_touch: Date.now(),
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}
