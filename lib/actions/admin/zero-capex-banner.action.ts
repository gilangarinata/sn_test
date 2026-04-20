"use server";

import { connectToDb } from "@/lib/mongoose";
import ZeroCapexBanner from "@/lib/models/zero-capex-banner.model";
import { createActivityLog } from "@/lib/actions/admin/auth.action";

interface Params {
    id?: string;
    image: string;
    backgroundImage: string;
    headingTitle: string;
    description: string;
}

export async function fetchZeroCapexBanners() {
    await connectToDb();
    try {
        const banners = await ZeroCapexBanner.find().sort({ createdAt: 1 });
        return {
            banners: JSON.parse(JSON.stringify(banners))
        };
    } catch (error) {
        console.error(`Failed to fetch Zero Capex banners: ${error}`);
        return { banners: [] };
    }
}

export async function updateZeroCapexBanner({
    id,
    image,
    backgroundImage,
    headingTitle,
    description
}: Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = !id || id === "" ? now.toString() : id;
        
        await ZeroCapexBanner.findOneAndUpdate(
            { id: currentId },
            {
                image: image,
                backgroundImage: backgroundImage,
                headingTitle: headingTitle,
                description: description,
            },
            { upsert: true }
        );
        
        await createActivityLog('UPDATE', `Updated Zero Capex Banner: ${currentId}`);
    } catch (error) {
        console.error(`Failed to update Zero Capex banner: ${error}`);
        throw new Error(`Failed to update Zero Capex banner: ${error}`);
    }
}

export async function deleteZeroCapexBanner(id: string): Promise<void> {
    await connectToDb();
    try {
        await ZeroCapexBanner.findOneAndDelete({ id: id });
        await createActivityLog('DELETE', `Deleted Zero Capex Banner: ${id}`);
    } catch (error) {
        console.error(`Failed to delete Zero Capex banner: ${error}`);
        throw new Error(`Failed to delete Zero Capex banner: ${error}`);
    }
}
