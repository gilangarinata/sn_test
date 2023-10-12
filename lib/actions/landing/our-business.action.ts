"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import WhoWeAre from "@/lib/models/who-we-are-banner.model";
import Subsidiaries from "@/lib/models/subsidiaries.model";
import OurDna from "@/lib/models/our-dna.model";
import OurBusinessBannerModel from "@/lib/models/our-business-banner.model";
import WhySolarModel from "@/lib/models/why-solar.model";
import SolarPowerWorksModel from "@/lib/models/solar-power-works.model";
import ScopeOfWork from "@/components/landing/our-business/scope-of-work";
import ScopeWorks from "@/lib/models/scope-works.model";
import OurExperience from "@/lib/models/our-experience";

export async function fetchOurBusiness() {
    try {
        await connectToDb();
        const [banner, whySolar, solarPowerWorks, scopeOfWork, ourExperience ] = await Promise.all([
            OurBusinessBannerModel.find().exec(),
            WhySolarModel.find().exec(),
            SolarPowerWorksModel.find().exec(),
            ScopeWorks.find().exec(),
            OurExperience.find().exec()
        ]);

        // Combine the data into a single object
        // Return the combined data
        return {
            banner,
            whySolar,
            solarPowerWorks,
            scopeOfWork,
            ourExperience
        };
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}