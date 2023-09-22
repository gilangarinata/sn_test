"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Achievement from "@/lib/models/achievement.model";
import Experience from "@/lib/models/experience.model";
import Customer from "@/lib/models/customer.model";

export async function fetchNewsAndCategories() {
    try {
        await connectToDb();
        const [banners, achievements, experiences, customers] = await Promise.all([
            Banner.find().exec(),
            Achievement.find().exec(),
            Experience.find().exec(),
            Customer.find().exec()
        ]);

        // Combine the data into a single object
        // Return the combined data
        return {
            banners,
            achievements,
            experiences,
            customers
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}