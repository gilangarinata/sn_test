"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";
import mongoose from "mongoose";
import Career from "@/lib/models/career.model";
import NewsCategory from "@/lib/models/news-category.model";
import News from "@/lib/models/news.model";

interface Params {
    id: string,
    title: string,
    description: string,
    location: string,
    type: string,
    departement: string
}


export async function fetchCareerByDepIds(
    departmentIds: string[] = [],
    pageNumber: number = 1,
    searchQuery: string = '',
    pageSize: number = 5,
) {
    await connectToDb();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const departmentQuery = departmentIds.length
            ? { departement: { $in: departmentIds } }
            : {}; // If departmentIds are not provided, query all data

        // Create a query object to filter by both department and search query
        const query: Record<string, any> = { ...departmentQuery };

        if (searchQuery) {
            // Add a condition to search by a specific field, e.g., 'title' or 'description'
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        const bannersQuery = Career.find(query)
            .sort({ _id: -1})
            .skip(skipAmount)
            .limit(pageSize)
            .populate('departement')
            .lean();

        const totalBannersCount = await Career.countDocuments(query);

        const careers = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + careers.length;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalBannersCount / pageSize);

        return {
            careers,
            isNext,
            totalBannersCount,
            totalPages,
        };
    } catch (error) {
        console.log(`Failed to get banners ${error}`);
        return null;
    }
}

export async function fetchAllCareer() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 1000;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Career.find()
            .sort({ _id: -1})
            .skip(skipAmount)
            .limit(pageSize)
            .populate("departement")
            .lean()

        const totalBannersCount = await Career.countDocuments();

        const banners = await bannersQuery.exec();
        const isNext = totalBannersCount > skipAmount + banners.length;
        return {
            banners,
            isNext,
            totalBannersCount
        };
    }catch (error) {
        console.log(`Failed to get banners ${error}`)
        return null;
    }
}

export async function fetchCareerById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = Career.findOne({_id: id})
            .populate("departement")
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


export async function updateCareer({
       id,
       title,
         description,
            location,
            type,
            departement
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);

        var dep = await Departement.findOne({name: departement});

        await Career.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                description: description,
                location: location,
                type: type,
                departement: dep._id
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteCareer({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Career.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}