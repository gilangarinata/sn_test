"use server";

import {connectToDb} from "@/lib/mongoose";
import Experience from "@/lib/models/experience.model";
import News from "@/lib/models/news.model";
import NewsCategory from "@/lib/models/news-category.model";
import mongoose, {Types} from "mongoose";
import Tag from "@/lib/models/tag.model";
import { createActivityLog } from "@/lib/actions/admin/auth.action";
import { getSession } from "@/lib/auth";

interface Params {
    id: string,
    title: string,
    content: string,
    category: string,
    image: string,
    tags: string[],
    relatedNews: string[],
    status?: string,
    publishAt?: Date | string | null,
}

interface TagParam {
    id: string,
    tag: string,
    news: string
}

interface INews extends Document {
    _id: Types.ObjectId;
    title: string;
    slug?: string;
}

// Utility function to generate a slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '');     // Trim leading and trailing hyphens
}

export async function updateNewsSlugs() {
    await connectToDb();
    try {
        const newsQuery = News.find().sort({ _id: -1 });
        const news: INews[] = await newsQuery.exec();

        // Iterate through each news item and update the slug
        for (let item of news) {
            const slug = generateSlug(item.title);  // Generate slug from the title

            // Update the news document with the generated slug
            await News.updateOne({ _id: item._id }, { $set: { slug: slug } });
        }

        // Fetch the updated news items if you need to return them
        const updatedNews: INews[] = await newsQuery.exec();

        return {
            banners: updatedNews,
        };
    } catch (error) {
        console.log("Failed to get banner")
        return null;
    }

}

export async function fetchNewsByCategory(_categoryId: string, pageNumber: number, pageSize: number) {
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

        const bannersQuery = News.find(filters)
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

export async function fetchAllNews(pageNumber: number, pageSize: number,
                                   categoryId?: string,
                                   year?: number,
                                   categoryName?: string,
                                   search?: string,
                                   status?: string,
                                   ) {
    await connectToDb();
    try {
        const filters: any = {};

        if (categoryId) {
            filters.category = categoryId;
        }

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filters.$or = [
                { title: { $regex: new RegExp(escapedSearch, 'i') } },
                { slug: { $regex: new RegExp(escapedSearch, 'i') } }
            ];
        }

        if (status && status !== 'all') {
            filters.status = status;
        }

        if (categoryName) {
            const escapedCategoryName = categoryName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            // Make matching flexible for "&", "dan", "and"
            const flexiblePattern = escapedCategoryName.replace(/\\(&|dan|and)/gi, "(&|dan|and)");
            const regex = new RegExp(`(^|\\b|\\[\\[)${flexiblePattern}(\\]\\]|\\b|$)`, 'i');
            
            const cat = await NewsCategory.findOne({ name: { $regex: regex }, type: 'news' });
            if (cat) {
                filters.category = cat._id;
            } else {
                return {
                    banners: [],
                    totalPages: 0
                };
            }
        }

        if (year && year > 0) {
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
        } else {
            // Allow admins to see everything including drafts
        }

        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = News.find(filters)
            .sort({ _id: -1})
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

        const totalBannersCount = await News.countDocuments(filters);
        const banners = await bannersQuery.exec();
        const totalPages = Math.ceil(totalBannersCount / pageSize);

        return {
            banners,
            totalPages
        };
    }catch (error) {
        console.error("Failed to get news:", error);
        return null;
    }
}

export async function fetchNewsById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = News.findOne({id: id})
            .populate("tags")
            .populate("relatedNews")
            .populate("category")
            .lean()
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

export async function fetchNewsBySlug(slug: string) {
    await connectToDb();
    try {
        const bannersQuery = News.findOne({slug: slug})
            .populate("tags")
            .populate("relatedNews")
            .populate("category")
            .lean()
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

export async function updateNews({
       id,
       title,
       content,
       category,
       image,
       tags,
       relatedNews,
       status,
       publishAt,
   } : Params): Promise<string | null> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id

        const cat = await NewsCategory.findOne({ name: category });

        console.log(`cat : ${category} `)
        console.log(cat)

        const slug = generateSlug(title)

        await News.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                content: content,
                category: cat._id,
                image: image,
                relatedNews: relatedNews,
                slug: slug,
                status: status || 'Draft',
                publishAt: publishAt ? new Date(publishAt) : undefined,
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

        await createActivityLog('UPDATE', `Updated News: ${title} (${currentId})`);
        return currentId;
    } catch (error) {
        console.error(`Failed to update news : ${error}`);
        return null;
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
        await createActivityLog('DELETE', `Deleted News: ${id}`);
    }catch (error) {
        throw new Error(`Failed to delete NewsCategory : ${error}`)
    }
}



export async function fetchLatestNews(slug?: string, limit: number = 6): Promise<any[]> {
    await connectToDb();
    try {
        const session = await getSession();
        const isAdmin = session && ['marketing', 'it', 'super_admin'].includes(session.role);

        const matchStage: any = {};
        if (slug && slug.trim().length > 0) {
            matchStage.slug = { $ne: slug.trim() };
        }
        if (!isAdmin) {
            matchStage.status = { $in: ['Published', 'Scheduled'] };
            matchStage.$or = [
                { status: 'Published' },
                { status: 'Scheduled', publishAt: { $lte: new Date() } }
            ];
        }

        const items = await News.aggregate([
            { $match: matchStage },
            { $sample: { size: limit } },
        ])
            .lookup({
                from: "newscategories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            })
            .lookup({
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags"
            })
            .lookup({
                from: "news",
                localField: "relatedNews",
                foreignField: "_id",
                as: "relatedNews"
            })
            .exec();

        return items as any[];
    } catch (e) {
        // Return an empty array to satisfy the any[] contract on failure
        return [];
    }
}
