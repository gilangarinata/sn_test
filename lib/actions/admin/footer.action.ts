"use server";

import {connectToDb} from "@/lib/mongoose";
import Banner from "@/lib/models/banner.model";
import Footer from "@/lib/models/footer.model";

// id: {type: String, required: true},
// title: String,
//     address: String,
//     address2: String,
//     email: String,
//     phone: String,
//     whatsapp: String
interface Params {
    title: string,
    address: string,
    address2: string,
    email: string,
    phone: string,
    whatsapp: string,
    faq: string,
    privacy: string,
    term: string
}


export async function fetchFooter() {
    await connectToDb();
    try {
        const bannersQuery = Footer.findOne({id:"main-footer"})
        const categories = await bannersQuery.exec();
        return {
            categories
        }
    }catch (error) {
        return null;
    }
}

export async function updateFooter({
       title,
       address,
       address2,
       phone,
       email,
       whatsapp,
        faq,
    privacy,
    term
   } : Params): Promise<void> {
    await connectToDb();
    try {
        await Footer.findOneAndUpdate(
            {id: "main-footer"},
            {
                title: title,
                address: address,
                address2: address2,
                phone: phone,
                email: email,
                whatsapp: whatsapp,
                faq: faq,
                privacy: privacy,
                term: term
            }, { upsert: true }
        )
    }catch (error) {
        throw new Error(`Failed to update banner : ${error}`)
    }
}


export async function deleteFooter({id} : {id:string}): Promise<void> {
    await connectToDb();

    try {
        await Footer.findOneAndDelete(
            {id: id }
        )
    }catch (error) {
        throw new Error(`Failed to delete banner : ${error}`)
    }
}