"use server";

import {connectToDb} from "@/lib/mongoose";
import Subsidiaries from "@/lib/models/subsidiaries.model";

interface Params {
    id: string,
    image: string,
    description: string
}

export async function fetchSubsidiaries() {
    console.log("featch banner 1");
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Subsidiaries.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Subsidiaries.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext
        };
    }catch (error) {
        console.log(`Failed to get banners ${error}`)
        return null;
    }
}


export async function updateSubsidiary({
       id,
       image,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await Subsidiaries.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteSubsidiary({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Subsidiaries.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}