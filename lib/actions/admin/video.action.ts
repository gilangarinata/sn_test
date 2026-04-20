"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";
import Video from "@/lib/models/video.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import Tag from "@/lib/models/tag.model";
import { getSession } from "@/lib/auth";
interface Params {
    id: string,
    title: string,
    description: string,
    videoUrl: string,
    category: string,
    status?: string,
    publishAt?: Date | string | null,
}

export async function fetchVideosByCategory(_categoryId: string, pageNumber: number, pageSize: number) {
    await connectToDb();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const session = await getSession();
        const isAdmin = session && ['marketing', 'it', 'super_admin'].includes(session.role);

        const filters: any = { category: _categoryId };
        if (!isAdmin) {
            filters.status = { $in: ['Published', 'Scheduled'] };
            filters.$or = [
                { status: 'Published' },
                { status: 'Scheduled', publishAt: { $lte: new Date() } }
            ];
        }

        const bannersQuery = Video.find(filters)
            .sort({ _id: -1})
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
        console.log("Failed to get banner")
        return null;
    }
}

export async function fetchAllVideos(pageNumber: number, pageSize: number, categoryId?: string,
                                   year?: number,
                                   categoryName?: string,
                                   search?: string,
                                   status?: string) {
    await connectToDb();
    try {
        const filters: any = {};

        if (categoryId) {
            filters.category = categoryId;
        }

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filters.title = { $regex: new RegExp(escapedSearch, 'i') };
        }

        if (status && status !== 'all') {
            filters.status = status;
        }

        if (categoryName) {
            const escapedCategoryName = categoryName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            // Make matching flexible for "&", "dan", "and"
            const flexiblePattern = escapedCategoryName.replace(/\\(&|dan|and)/gi, "(&|dan|and)");
            const regex = new RegExp(`(^|\\b|\\[\\[)${flexiblePattern}(\\]\\]|\\b|$)`, 'i');
            
            const cat = await NewsCategory.findOne({ name: { $regex: regex }, type: 'video' });
            if (cat) {
                filters.category = cat._id;
            } else {
                return {
                    banners: [],
                    totalPages: 0
                };
            }
        }

        if (year) {
            // Assuming you have a 'date' field in your news documents
            filters.createdAt = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
        }
        
        const session = await getSession();
        const isAdmin = session && ['marketing', 'it', 'super_admin'].includes(session.role);
        if (!isAdmin) {
            filters.status = { $in: ['Published', 'Scheduled'] };
            filters.$or = [
                { status: 'Published' },
                { status: 'Scheduled', publishAt: { $lte: new Date() } }
            ];
        }

        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Video.find(filters)
            .sort({ _id: -1})
            .skip(skipAmount)
            .limit(pageSize)
            .populate([
                {
                    path: "category",
                    model: NewsCategory,
                }
            ])
            .lean()


        const totalBannersCount = await Video.countDocuments(filters);
        const banners = await bannersQuery.exec();

        const totalPages = Math.ceil(totalBannersCount / pageSize);

        return {
            banners,
            totalPages
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}

export async function fetchVideoById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = Video.findOne({id: id})
        // const totalBannersCount = await News.countDocuments();
        const news = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banner.length;
        return {
            news
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}


export async function updateVideo({
       id,
       title, description, videoUrl, category, status, publishAt
   } : Params): Promise<string | null> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id

        const cat = await NewsCategory.findOne({ name: category });

        console.log(currentId);
        await Video.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                description: description,
                videoUrl: videoUrl,
                category: cat._id,
                status: status || 'Draft',
                publishAt: publishAt ? new Date(publishAt) : undefined,
            }, { upsert: true }
        )
        return currentId;
    } catch (error) {
        console.error(`Failed to update video : ${error}`);
        return null;
    }
}


export async function deleteVideo({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Video.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}