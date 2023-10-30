"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";

interface Params {
    id: string,
    title: string,
    total: string,
    icon: string,
    description: string
}

export async function fetchExperiences() {
    console.log("featch banner 1");
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Experience.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Experience.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}

export async function fetchMainExperience() {
    await connectToDb();
    try {
        const bannersQuery = Experience.findOne({id:"main-experience"})
        return await bannersQuery.exec();
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}

export async function updateExperience({
       id,
       title,
       icon,
       total,
       description,
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await Experience.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                icon: icon,
                total: total,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update experience : ${error}`)
    }
}


export async function deleteExperience({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Experience.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}