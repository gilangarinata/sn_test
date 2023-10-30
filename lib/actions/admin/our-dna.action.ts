"use server";

import {connectToDb} from "@/lib/mongoose";
import OurDna from "@/lib/models/our-dna.model";

interface Params {
    id: string,
    image: string,
    description: string,
    title: string
}

export async function fetchOurDna() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = OurDna.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await OurDna.countDocuments();

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


export async function updateOurDna({
       id,
       image, title,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await OurDna.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                description: description,
                title: title
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteOurDna({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await OurDna.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}