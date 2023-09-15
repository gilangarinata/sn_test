"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";

export async function updateBanner(): Promise<void> {
    connectToDb();

}