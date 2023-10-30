"use server";

import {connectToDb} from "@/lib/mongoose";
import SolarPowerWorksModel from "@/lib/models/solar-power-works.model";

interface Params {
    id: string,
    image: string,
    title: string,
    subtitle: string,
    description: string
}

export async function fetchSolarPowerWorks() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = SolarPowerWorksModel.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await SolarPowerWorksModel.countDocuments();

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

export async function updateSolarPowerWork({
       id,
       image,
       title,
        subtitle,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await SolarPowerWorksModel.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                title: title,
                subtitle: subtitle,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteSolarPowerWork({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await SolarPowerWorksModel.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}