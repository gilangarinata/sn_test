"use server"

import { connectToDb } from "@/lib/mongoose";
import ZeroCapexModel from "@/lib/models/zero-capex.model";

interface ZeroCapexParams {
    url: string;
    email: string;
    dayaTerpasang: string;
    dayaListrik: string;
    luasProperty: string;
    tagihanPerBulan: string;
    tarifListrik: string;
    estimasiPenggunaanDaya: string;
    lokasiInstallasi: string;
    rekomendasiInstallasi: string;
    areaPotensial: string;
    jumlahModulSurya: string;
    produksiEnergiPerTahun: string;
    periodeInstallasi: string;
    lokasi: string;
    name: string;
    company: string;
    whatsapp: string;
    pdfUrl: string
}

export async function fetchZeroCapex() {
    await connectToDb();
    try {
        const zeroCapexQuery = ZeroCapexModel.find();
        const zeroCapex = await zeroCapexQuery.exec();
        return {
            zeroCapex,
        };
    } catch (error) {
        console.log("Failed to fetch ZeroCapex:", error);
        return null;
    }
}

export async function createZeroCapex(params: ZeroCapexParams): Promise<void> {
    await connectToDb();
    try {
        await ZeroCapexModel.create(params);
    } catch (error) {
        throw new Error(`Failed to create ZeroCapex: ${error}`);
    }
}

export async function deleteZeroCapex({ id }: { id: string }): Promise<void> {
    await connectToDb();
    try {
        await ZeroCapexModel.findOneAndDelete({ _id: id });
    } catch (error) {
        throw new Error(`Failed to delete ZeroCapex: ${error}`);
    }
}