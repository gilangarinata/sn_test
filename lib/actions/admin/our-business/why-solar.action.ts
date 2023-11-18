"use server";

import {connectToDb} from "@/lib/mongoose";
import WhySolarModel from "@/lib/models/why-solar.model";

interface Params {
    id: string,
    icon: string,
    title: string,
    description: string
}

export async function fetchWhySolar() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = WhySolarModel.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await WhySolarModel.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext
        };
    }catch (error) {
        //console.log(`Failed to get banners ${error}`)
        return null;
    }
}

export async function updateWhySolar({
       id,
       icon,
       title,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        //console.log(currentId);
        await WhySolarModel.findOneAndUpdate(
            {id: currentId},
            {
                icon: icon,
                title: title,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteWhySolar({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await WhySolarModel.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}