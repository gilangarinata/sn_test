"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Departement from "@/lib/models/departement.model";
import mongoose from "mongoose";
import Career from "@/lib/models/career.model";
import NewsCategory from "@/lib/models/news-category.model";
import News from "@/lib/models/news.model";
import CareerRegister from "@/lib/models/career_register.model";
interface Params {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    address: string,
    lastEducation: string,
    campus: string,
    studyMajor: string,
    schoolStartYear1: string,
    schoolStartYear2: string,
    schoolEndYear1: string,
    schoolEndYear2: string,
    previousCompany: string,
    previousDesignation: string,
    availabilityPeriod: string,
    urlSites: string,
    howDidYouKnow: string,
    resume: string,
    portfolio: string,
    ijazah: string,
    transkrip: string,
    type: string,
    division: string
}


export async function fetchAllCareerRegister() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = CareerRegister.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await CareerRegister.countDocuments();

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

export async function fetchCareerRegisterById(id: string) {
    await connectToDb();
    try {
        const bannersQuery = CareerRegister.findOne({_id: id})
        // const totalBannersCount = await News.countDocuments();
        const career = await bannersQuery.exec();
        // const isNext = totalBannersCount > skipAmount + banner.length;

        return {
            career
        };
    }catch (error) {
        console.log("Failed to get banner")
        return null;
    }
}

export async function updateCareerRegister({
       id,
          firstName,
            lastName,
            email,
            contactNumber,
            address,
            lastEducation,
            campus,
            studyMajor,
            schoolStartYear1,
            schoolStartYear2,
            schoolEndYear1,
            schoolEndYear2,
            previousCompany,
            previousDesignation,
            availabilityPeriod,
            urlSites,
            howDidYouKnow,
            resume,
            portfolio,
            ijazah,
            transkrip,
            type,
            division


                                   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);

        await CareerRegister.findOneAndUpdate(
            {id: currentId},
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contactNumber: contactNumber,
                address: address,
                lastEducation: lastEducation,
                campus: campus,
                studyMajor: studyMajor,
                schoolStartYear1: schoolStartYear1,
                schoolStartYear2: schoolStartYear2,
                schoolEndYear1: schoolEndYear1,
                schoolEndYear2: schoolEndYear2,
                previousCompany: previousCompany,
                previousDesignation: previousDesignation,
                availabilityPeriod: availabilityPeriod,
                urlSites: urlSites,
                howDidYouKnow: howDidYouKnow,
                resume: resume,
                portfolio: portfolio,
                ijazah: ijazah,
                transkrip: transkrip,
                type: type,
                division: division,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function updateCareerRegisterMessage({
                                               email,
                                                message,
                                           } : {email: string, message:string}): Promise<void> {
    await connectToDb();
    try {

        console.log(email + " MM " + message);
        const data = await CareerRegister.findOne({email: email}).exec()
        console.log(data.id + " MM2 " + message);
        await CareerRegister.findOneAndUpdate(
            {id: data.id},
            {
                testResult: message,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}

export async function deleteCareerRegister({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await CareerRegister.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}