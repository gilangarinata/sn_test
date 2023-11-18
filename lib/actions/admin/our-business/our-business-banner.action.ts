"use server";

import {connectToDb} from "@/lib/mongoose";
import OurBusinessBanner from "@/lib/models/our-business-banner.model";

interface Params {
    id: string,
    image: string,
    url: string,
    description: string
}

export async function fetchOurBusinessBanners() {
    //console.log("featch banner 1");
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = OurBusinessBanner.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await OurBusinessBanner.countDocuments();

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

export async function updateOurBusinessBanner({
       id,
       image,
       url,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        //console.log(currentId);
        await OurBusinessBanner.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                url: url,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteOurBusinessBanner({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await OurBusinessBanner.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}