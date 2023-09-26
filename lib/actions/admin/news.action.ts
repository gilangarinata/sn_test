"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import mongoose from "mongoose";
import Tag from "@/lib/models/tag.model";

interface Params {
    id: string,
    title: string,
    content: string,
    category: string,
    image: string,
    tags: string[],
    relatedNews: string[]
}

interface TagParam {
    id: string,
    tag: string,
    news: string
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

        const bannersQuery = News.find()
            .skip(skipAmount)
            .limit(pageSize)
            .populate("relatedNews")
            .populate([
                {
                    path: "category",
                    model: NewsCategory,
                },
                {
                    path: "tags",
                    model: Tag,
                }
            ])
            .lean()

        // const totalBannersCount = await News.countDocuments();
        const banners = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banners.length;
        console.log("BN:")
        console.log(banners)
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
            .populate("tags")
            .populate("relatedNews")
            .lean()
        // const totalBannersCount = await News.countDocuments();
        const news = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banners.length;

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
        image,
        tags,
        relatedNews
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
                image: image,
                relatedNews: relatedNews
            }, { upsert: true }
        )

        const news = await News.findOne({
            id: currentId
        })
        await deleteTags({newsId: news._id})

        for (const tag of tags) {
            await updateTag(
                {
                    id: "",
                    tag: tag,
                    news: news._id
                }
            )
        }

        const tgs = await Tag.find({news: news._id})

        await News.findOneAndUpdate(
            {id: currentId},
            {
                tags : tgs.map((uy) => uy._id)
            },
        )
    }catch (error) {
        throw new Error(`Failed to update news category : ${error}`)
    }
}

export async function updateTag({id, tag, news} : TagParam): Promise<void> {
    await connectToDb();
    try {

        const now = Date.now();
        const currentId = id === "" ? now.toString() + Math.random().toString() : id

        await Tag.findOneAndUpdate(
            {id: currentId},
            {
                tag: tag,
                news: news
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update tag : ${error}`)
    }
}

export async function deleteTags({newsId} : {newsId:string}): Promise<void> {
    await connectToDb();

    try {
        await Tag.deleteMany(
            {news: newsId }
        )
    }catch (error) {
        throw new Error(`Failed to delete NewsCategory : ${error}`)
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