"use server";

import {connectToDb} from "@/lib/mongoose";
import GetInTouchModel from "@/lib/models/get-in-touch.model";
import ScopeWorksModel from "@/lib/models/scope-works.model";

interface Params {
    id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
}

export async function fetchGetInTouch(pageNumber = 1, pageSize = 10) {
    await connectToDb();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = GetInTouchModel.find()
            .sort({ createdAt: -1})
            .skip(skipAmount)
            .limit(pageSize)
            .lean(); // Use lean() to fix plain object warning

        const totalBannersCount = await GetInTouchModel.countDocuments();
        const banners = await bannersQuery.exec();
        const totalPages = Math.ceil(totalBannersCount / pageSize);

        // Sanitize data for client components
        const sanitizedBanners = banners.map((item: any) => ({
            ...item,
            id: item._id.toString(),
            _id: item._id.toString(),
            createdAt: item.createdAt ? item.createdAt.toISOString() : null,
            updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
        }));

        return {
            banners: sanitizedBanners,
            totalPages
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
                                           message,
                                           namaPerusahaan
                                       } : {
    id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    namaPerusahaan: string
}): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id;
        await GetInTouchModel.findOneAndUpdate(
            { id: currentId },
            {
                name,
                email,
                phone,
                message,
                namaPerusahaan,
            },
            { upsert: true }
        )
    } catch (error) {
        throw new Error(`Failed to update GetInTouch : ${error}`);
    }
}


export async function deleteGetInTouch({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await GetInTouchModel.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}