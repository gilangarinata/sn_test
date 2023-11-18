"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";

interface Params {
    id: string,
    image: string,
    url: string,
    headingTitle: string,
    subHeading: string,
    isCustomBanner: boolean,
    logo: string,
    description: string
}

export async function fetchBanners() {
    //console.log("featch banner 1");
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Banner.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Banner.countDocuments();

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

export async function fetchMainBanners() {
    await connectToDb();
    try {
        const bannersQuery = Banner.findOne({id:"main-banner"})
        return await bannersQuery.exec();
    }catch (error) {
        //console.log("Failed to get banner")
        return null;
    }
}

export async function updateBanner({
       id,
       image,
       url,
       headingTitle,
       subHeading,
       isCustomBanner,
       logo,
       description
   } : Params): Promise<void> {
    await connectToDb();
    //console.log(`${id} ${image} ${url} ${headingTitle} ${subHeading} ${isCustomBanner} ${logo}`);
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        //console.log(currentId);
        await Banner.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                url: url,
                headingTitle: headingTitle,
                subHeading: subHeading,
                isCustomBanner: isCustomBanner,
                logo: logo,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteBanner({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Banner.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}