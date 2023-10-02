"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import WhoWeAre from "@/lib/models/who-we-are-banner.model";
import Subsidiaries from "@/lib/models/subsidiaries.model";
import OurDna from "@/lib/models/our-dna.model";

export async function fetchWhoWeAre() {
    try {
        await connectToDb();
        const [whoWeAre, subsidiaries, ourDna, ] = await Promise.all([
            WhoWeAre.findOne().exec(),
            Subsidiaries.find().exec(),
            OurDna.find().exec(),
        ]);

        // Combine the data into a single object
        // Return the combined data
        return {
            whoWeAre,
            subsidiaries,
            ourDna
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}