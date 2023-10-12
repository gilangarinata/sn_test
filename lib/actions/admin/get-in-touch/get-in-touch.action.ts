"use server";

import {connectToDb} from "@/lib/mongoose";
import GetInTouchModel from "@/lib/models/get-in-touch.model";

interface Params {
    id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
}

export async function fetchGetInTouch() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 20;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = GetInTouchModel.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await GetInTouchModel.countDocuments();

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

export async function updateGetInTouch({
       id,
       name,
       email,
       phone,
         message
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await GetInTouchModel.findOneAndUpdate(
            {id: currentId},
            {
                name: name,
                email: email,
                phone: phone,
                message: message
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}
