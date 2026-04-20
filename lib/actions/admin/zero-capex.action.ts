"use server"

import { connectToDb } from "@/lib/mongoose";
import ZeroCapexModel from "@/lib/models/zero-capex.model";

interface ZeroCapexParams {
    id?: string;
    url?: string;
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
    pdfUrl?: string
}

export async function fetchZeroCapex(
    pageNumber = 1, 
    pageSize = 10,
    search?: string,
    category?: string,
    startDate?: Date,
    endDate?: Date
) {
    await connectToDb();
    try {
        const filters: any = {};

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filters.$or = [
                { name: { $regex: new RegExp(escapedSearch, 'i') } },
                { email: { $regex: new RegExp(escapedSearch, 'i') } },
                { company: { $regex: new RegExp(escapedSearch, 'i') } },
                { whatsapp: { $regex: new RegExp(escapedSearch, 'i') } },
            ];
        }

        if (category && category !== 'all') {
            let categoryRegex;
            if (category === 'Komersial') categoryRegex = 'Commercial';
            else if (category === 'Industri') categoryRegex = 'Industry';
            else if (category === 'Tambang') categoryRegex = 'Mining';
            
            if (categoryRegex) {
                filters.dayaTerpasang = { $regex: new RegExp(categoryRegex, 'i') };
            }
        }

        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                filters.createdAt.$gte = start;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filters.createdAt.$lte = end;
            }
        }

        const skipAmount = (pageNumber - 1) * pageSize;
        const zeroCapexQuery = ZeroCapexModel.find(filters)
            .sort({ createdAt: -1 })
            .skip(skipAmount)
            .limit(pageSize)
            .lean();
            
        const totalCount = await ZeroCapexModel.countDocuments(filters);
        const zeroCapex = await zeroCapexQuery.exec();
        const totalPages = Math.ceil(totalCount / pageSize);

        const sanitizedZeroCapex = zeroCapex.map((item: any) => ({
            ...item,
            _id: item._id.toString(),
            createdAt: item.createdAt ? item.createdAt.toISOString() : null,
            updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
        }));

        return {
            zeroCapex: sanitizedZeroCapex,
            totalPages,
        };
    } catch (error) {
        console.log("Failed to fetch ZeroCapex:", error);
        return null;
    }
}

export async function fetchAllZeroCapexForExport(
    search?: string,
    category?: string,
    startDate?: Date,
    endDate?: Date
) {
    await connectToDb();
    try {
        const filters: any = {};

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filters.$or = [
                { name: { $regex: new RegExp(escapedSearch, 'i') } },
                { email: { $regex: new RegExp(escapedSearch, 'i') } },
                { company: { $regex: new RegExp(escapedSearch, 'i') } },
                { whatsapp: { $regex: new RegExp(escapedSearch, 'i') } },
            ];
        }

        if (category && category !== 'all') {
            let categoryRegex;
            if (category === 'Komersial') categoryRegex = 'Commercial';
            else if (category === 'Industri') categoryRegex = 'Industry';
            else if (category === 'Tambang') categoryRegex = 'Mining';
            
            if (categoryRegex) {
                filters.dayaTerpasang = { $regex: new RegExp(categoryRegex, 'i') };
            }
        }

        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                filters.createdAt.$gte = start;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filters.createdAt.$lte = end;
            }
        }

        const zeroCapex = await ZeroCapexModel.find(filters)
            .sort({ createdAt: -1 })
            .lean();

        return zeroCapex.map((item: any) => ({
            ...item,
            _id: item._id.toString(),
            createdAt: item.createdAt ? item.createdAt.toISOString() : null,
            updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
        }));
    } catch (error) {
        console.log("Failed to fetch ZeroCapex for export:", error);
        return [];
    }
}

export async function createZeroCapex(params: ZeroCapexParams): Promise<string> {
    await connectToDb();
    try {
        const { id, ...data } = params;
        
        let result;
        if (id && id !== "") {
            result = await ZeroCapexModel.findByIdAndUpdate(id, data, { new: true, upsert: true });
        } else {
            result = await ZeroCapexModel.create(data);
        }
        
        return result._id.toString();
    } catch (error) {
        throw new Error(`Failed to create/update ZeroCapex: ${error}`);
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