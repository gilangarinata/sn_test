"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import mongoose from "mongoose";

interface Params {
    id: string,
    name: string,
    banner: string,
    description: string,
    type: string
}

export async function fetchCategories(type: string) {
    await connectToDb();
    //console.log("type::", type)
    try {
        const bannersQuery = NewsCategory.find({type : type})
        const categories = await bannersQuery.exec();
        return {
            categories
        }
    }catch (error) {
        //console.log("Failed to get banner")
        return null;
    }
}

export async function fetchCategory(_id : string) {
    await connectToDb();
    try {
        const bannersQuery = NewsCategory.findOne({_id : _id})
        const categories = await bannersQuery.exec();
        return {
            categories
        }
    }catch (error) {
        //console.log("Failed to get banner")
        return null;
    }
}

export async function updateNewsCategory({
       id,
       name,
       banner,
       description,
        type
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        await NewsCategory.findOneAndUpdate(
            {id: currentId},
            {
                name: name,
                banner: banner,
                description: description,
                type: type
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update news category : ${error}`)
    }
}




export async function deleteNewsCategory({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await NewsCategory.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete NewsCategory : ${error}`)
    }
}