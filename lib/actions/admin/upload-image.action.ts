"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import mongoose from "mongoose";
import ImageModel from "@/lib/models/image.model";

interface Params {
    url: string
}

export async function fetchImages() {
    await connectToDb();
    try {
        const bannersQuery = ImageModel.find()
        const images = await bannersQuery.exec();
        return {
            images
        }
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}


export async function createImage({
       url
   } : Params): Promise<void> {
    await connectToDb();
    try {
        await ImageModel.create(
            {
                url: url
            }
        )
    }catch (error) {
        throw new Error(`Failed to update news category : ${error}`)
    }
}




export async function deleteImage({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await ImageModel.findOneAndDelete(
            {_id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete NewsCategory : ${error}`)
    }
}