"use server";

import {connectToDb} from "@/lib/mongoose";
import WhoWeAreBanner from "@/components/admin/who-we-are/banner/who-we-are-banner";
import WhoWeAre from "@/lib/models/who-we-are-banner.model";
import CareerQuestion from "@/lib/models/career_question.model";

interface Params {
    question: string,
}

export async function fetchCareerQuestions() {
    await connectToDb();
    try {
        const bannersQuery = CareerQuestion.find()
        const banners = await bannersQuery.exec();
        return {
            banners
        };
    } catch (error) {
        console.log(`Failed to get banners ${error}`)
        return null;
    }
}

export async function updateCareerQuestion({
                                               question
                                           }: Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        await CareerQuestion.findOneAndUpdate(
            {id: now},
            {
                question: question,
            }, {upsert: true}
        )
    } catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteCareerQuestion({id}: { id: string }): Promise<void> {
    await connectToDb();

    try {
        await CareerQuestion.findOneAndDelete(
            {id: id}
        )
    } catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}