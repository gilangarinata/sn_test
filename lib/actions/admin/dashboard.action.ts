"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import {revalidatePath} from "next/cache";

interface Params {
    id: string,
    image: string,
    url: string,
    headingTitle: string,
    subHeading: string,
    isCustomBanner: boolean,
    logo: string,
    path: string
}

export async function updateBanner({
       id,
       image,
       url,
       headingTitle,
       subHeading,
       isCustomBanner,
       logo,
       path
   } : Params): Promise<void> {
    await connectToDb();
    try {
        await Banner.findOneAndUpdate(
            {id: id},
            {
                image: image,
                url: url,
                headingTitle: headingTitle,
                subHeading: subHeading,
                isCustomBanner: isCustomBanner,
                logo: logo
            }, { upsert: true }
        )

        if(path === '/dashboard/banner/edit') {
            revalidatePath(path);
        }
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}