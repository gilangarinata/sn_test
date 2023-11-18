"use server";

import {connectToDb} from "@/lib/mongoose";
import Achievement from "@/lib/models/achievement.model";
interface Params {
    id: string,
    description: string,
    icon: string
}

export async function fetchAchievement() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Achievement.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Achievement.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext
        };
    }catch (error) {
        //console.log("Failed to get banner")
        return null;
    }
}


export async function updateAchievement({
       id,
       description,
       icon,
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        //console.log(currentId);
        await Achievement.findOneAndUpdate(
            {id: currentId},
            {
                description: description,
                icon: icon
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update experience : ${error}`)
    }
}


export async function deleteAchievement({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Achievement.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}