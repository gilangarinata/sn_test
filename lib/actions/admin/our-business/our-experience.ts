"use server";

import {connectToDb} from "@/lib/mongoose";
import OurExperience from "@/lib/models/our-experience";

interface Params {
    id: string,
    image: string,
    title: string,
    link: string
}

export async function fetchOurExperience() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 20;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = OurExperience.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await OurExperience.countDocuments();

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

export async function updateOurExperience({
       id,
       image,
       title,
       link
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await OurExperience.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                title: title,
                link: link,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteOurExperience({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await OurExperience.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}