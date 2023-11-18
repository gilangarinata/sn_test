"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";

interface Params {
    id: string,
    name: string,
}

export async function fetchDepartements() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Departement.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Departement.countDocuments();

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


export async function updateDepartement({
       id,
       name,
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        //console.log(currentId);
        await Departement.findOneAndUpdate(
            {id: currentId},
            {
                name: name,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteDepartement({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Departement.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}