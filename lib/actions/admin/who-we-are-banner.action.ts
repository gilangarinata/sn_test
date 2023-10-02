"use server";

import {connectToDb} from "@/lib/mongoose";
import WhoWeAreBanner from "@/components/admin/who-we-are/banner/who-we-are-banner";
import WhoWeAre from "@/lib/models/who-we-are-banner.model";

interface Params {
    image: string,
    url: string,
    headingTitle: string,
    bannerHeadingTitle: string,
    description: string
}

export async function fetchWhoWeAreBanner() {
    await connectToDb();
    try {
        const bannersQuery = WhoWeAre.findOne()
        const banners = await bannersQuery.exec();
        return {
            banners
        };
    } catch (error) {
        console.log(`Failed to get banners ${error}`)
        return null;
    }
}

export async function updateWhoWeAreBanner({
                                               image,
                                               url,
                                               headingTitle,
                                               bannerHeadingTitle,
                                               description
                                           }: Params): Promise<void> {
    await connectToDb();
    try {
        const id = "WhoWeAre"
        await WhoWeAre.findOneAndUpdate(
            {id: id},
            {
                image: image,
                url: url,
                headingTitle: headingTitle,
                bannerHeadingTitle: bannerHeadingTitle,
                description: description,
            }, {upsert: true}
        )
    } catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function updateVisionMission({
                                              vision,
                                              mission,
                                          }: { vision: string, mission: string }): Promise<void> {
    await connectToDb();
    try {
        const id = "WhoWeAre"
        await WhoWeAre.findOneAndUpdate(
            {id: id},
            {
                vision: vision,
                mission: mission,
            }, {upsert: true}
        )
    } catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}

export async function updateDirector(
    {
                                         messageDirectorTitle,
                                         messageDirectorDescription,
                                         companyProfileUrl
                                     }: {
    messageDirectorTitle: string,
    messageDirectorDescription: string,
    companyProfileUrl: string
}
): Promise<void> {
    await connectToDb();
    try {
        const id = "WhoWeAre"
        console.log("START EDIT")
        await WhoWeAre.findOneAndUpdate(
            {id: id},
            {
                messageDirectorTitle: messageDirectorTitle,
                messageDirectorDescription: messageDirectorDescription,
                companyProfileUrl:companyProfileUrl
            }, {upsert: true}
        )

        console.log("DONE EDIT")
    } catch (error) {
        console.log("ERROR EDIT")
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function updateCompanyProfile({
         companyProfileUrl,
    }: { companyProfileUrl: string }): Promise<void> {
    await connectToDb();
    try {
        const id = "WhoWeAre"
        await WhoWeAre.findOneAndUpdate(
            {id: id},
            {
                companyProfileUrl: companyProfileUrl,
            }, {upsert: true}
        )
    } catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}

export async function deleteBanner({id}: { id: string }): Promise<void> {
    await connectToDb();

    try {
        await WhoWeAre.findOneAndDelete(
            {id: id}
        )
    } catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}