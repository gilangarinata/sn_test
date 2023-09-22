"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import mongoose from "mongoose";

interface Params {
    id: string,
    title: string,
    content: string,
    category: string,
    image: string
}

export async function fetchNewsByCategory(_categoryId: string, pageNumber: number, pageSize: number) {
    await connectToDb();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = News.find({category : _categoryId})
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await News.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext
        };
    }catch (error) {
        console.log("Failed to get banners")
        return null;
    }
}

export async function fetchAllNews(pageNumber: number, pageSize: number) {
    await connectToDb();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;
        console.log(`Failed 1`)
        const bannersQuery = News.find()
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: "category",
                model: NewsCategory,
            })
            .lean()

        // const totalBannersCount = await News.countDocuments();
        const banners = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banners.length;

        console.log(`Failed aaa ${banners}`)
        return {
            banners
        };
    }catch (error) {
        console.log("Failed to get banners")
        return null;
    }
}

export async function fetchNewsById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = News.findOne({id: id})
        // const totalBannersCount = await News.countDocuments();
        const news = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banners.length;

        console.log(`Failed aaa ${news}`)
        return {
            news
        };
    }catch (error) {
        console.log("Failed to get banners")
        return null;
    }
}

export async function updateNews({
       id,
       title,
       content,
       category,
        image
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id

        const cat = await NewsCategory.findOne({ name: category });

        console.log(`cat : ${category} `)
        console.log(cat)

        await News.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                content: content,
                category: cat._id,
                image: image
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update news category : ${error}`)
    }
}


export async function deleteNews({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await News.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete NewsCategory : ${error}`)
    }
}