"use server";

import {connectToDb} from "@/lib/mongoose";
import Customer from "@/lib/models/customer.model";
interface Params {
    id: string,
    title: string,
    icon: string,
    url: string
}

export async function fetchCustomers() {
    await connectToDb();
    try {
        const pageNumber = 1;
        const pageSize = 200;
        const skipAmount = (pageNumber - 1) * pageSize;

        const bannersQuery = Customer.find()
            .skip(skipAmount)
            .limit(pageSize)

        const totalBannersCount = await Customer.countDocuments();

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


export async function updateCustomer({
       id,
       title,
       icon,
       url,
   } : Params): Promise<void> {
    await connectToDb();
    try {
        const now = Date.now();
        const currentId = id === "" ? now.toString() : id
        console.log(currentId);
        await Customer.findOneAndUpdate(
            {id: currentId},
            {
                title: title,
                icon: icon,
                url: url,
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update experience : ${error}`)
    }
}


export async function deleteCustomer({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Customer.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}