"use server";

import {connectToDb} from "@/lib/mongoose";
import ScopeWorksModel from "@/lib/models/scope-works.model";

interface Params {
    id: string,
    image: string,
    title: string,
    description: string
}

export async function fetchScopeWork() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 20;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = ScopeWorksModel.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await ScopeWorksModel.countDocuments();

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

export async function updateScopeWOrk({
       id,
       image,
       title,
       description
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await ScopeWorksModel.findOneAndUpdate(
            {id: currentId},
            {
                image: image,
                title: title,
                description: description,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteScopeWork({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await ScopeWorksModel.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}