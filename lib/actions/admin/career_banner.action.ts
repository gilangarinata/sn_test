"use server";

import {connectToDb} from "@/lib/mongoose";
import WhoWeAreBanner from "@/components/admin/who-we-are/banner/who-we-are-banner";
import WhoWeAre from "@/lib/models/who-we-are-banner.model";
import CareerQuestion from "@/lib/models/career_question.model";
import CareerBanner from "@/lib/models/career_banner";

interface Params {
    image: string,
    description: string
}

export async function fetchCareerBanners() {
    await connectToDb();
    try {
        const bannersQuery = CareerBanner.find()
        const banners = await bannersQuery.exec();
        return {
            banners
        };
    } catch (error) {
        console.log(`Failed to get banners ${error}`)
        return null;
    }
}

export async function updateCareerBanner({
                                               image,
                                                description,
                                           }: Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        await CareerBanner.findOneAndUpdate(
            {id: now},
            {
                image: image,
                description: description
            }, {upsert: true}
        )
    } catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteCareerBanner({id}: { id: string }): Promise<void> {
    await connectToDb();

    try {
        await CareerBanner.findOneAndDelete(
            {id: id}
        )
    } catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}