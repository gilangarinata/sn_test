"use server";

import { connectToDb } from "@/lib/mongoose";
import NewsContributor, { INewsContributor, ContributorRole } from "@/lib/models/news-contributor.model";
import News from "@/lib/models/news.model";
import { Types } from "mongoose";

/** Helper to validate ObjectId */
function toObjectId(id: string): Types.ObjectId {
    if (!id || !Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
    }
    return new Types.ObjectId(id);
}

/* ============================
 * CREATE
 * ============================ */
export async function createContributor(params: {
    newsId: string;       // News._id as string
    name: string;
    role: ContributorRole;
    email?: string;
}): Promise<INewsContributor> {
    await connectToDb();

    const newsObjectId = toObjectId(params.newsId);
    const news = await News.findById(newsObjectId).select({ _id: 1 }).lean();
    if (!news) throw new Error("News not found");

    // If you keep the unique (news, role) index, upsert is handy:
    const doc = await NewsContributor.findOneAndUpdate(
        { news: newsObjectId, role: params.role, isDeleted: false },
        { $set: { name: params.name, email: params.email ?? undefined } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean<INewsContributor>();

    return doc!;
}

/* ============================
 * READ
 * ============================ */
/** Get contributors for a single news (excluding soft-deleted). */
export async function getContributorsByNews(newsId: string): Promise<INewsContributor[]> {
    await connectToDb();
    const newsObjectId = toObjectId(newsId);

    const items = await NewsContributor.find({
        news: newsObjectId,
        isDeleted: false,
    })
        .sort({ role: 1, createdAt: -1 })
        .lean()
        .exec();

    return items as INewsContributor[];
}

/** Optionally list contributors with filters (role / keyword), paginated. */
export async function listContributors(opts?: {
    role?: ContributorRole;
    q?: string;            // search in name/email
    page?: number;
    pageSize?: number;
    includeDeleted?: boolean;
}): Promise<{ items: INewsContributor[]; total: number; page: number; pageSize: number; }> {
    await connectToDb();

    const page = Math.max(1, opts?.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts?.pageSize ?? 20));
    const skip = (page - 1) * pageSize;

    const filter: any = {};
    if (opts?.role) filter.role = opts.role;
    if (!opts?.includeDeleted) filter.isDeleted = false;
    if (opts?.q) {
        filter.$or = [
            { name: { $regex: opts.q, $options: "i" } },
            { email: { $regex: opts.q, $options: "i" } },
        ];
    }

    const [items, total] = await Promise.all([
        NewsContributor.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean().exec(),
        NewsContributor.countDocuments(filter),
    ]);

    return { items: items as INewsContributor[], total, page, pageSize };
}

/* ============================
 * UPDATE
 * ============================ */
export async function updateContributor(params: {
    contributorId: string;
    name?: string;
    role?: ContributorRole;   // changing role allowed; beware of unique index
    email?: string | null;
}): Promise<INewsContributor | null> {
    await connectToDb();

    const _id = toObjectId(params.contributorId);
    const updates: any = {};
    if (typeof params.name === "string") updates.name = params.name;
    if (typeof params.role === "string") updates.role = params.role;
    if (params.email === null) updates.email = undefined;
    else if (typeof params.email === "string") updates.email = params.email;

    const updated = await NewsContributor.findOneAndUpdate(
        { _id },
        { $set: updates },
        { new: true }
    ).lean<INewsContributor | null>();

    return updated;
}

/* ============================
 * SOFT-DELETE
 * ============================ */
export async function softDeleteContributor(contributorId: string): Promise<boolean> {
    await connectToDb();
    const _id = toObjectId(contributorId);

    const res = await NewsContributor.updateOne(
        { _id },
        { $set: { isDeleted: true } }
    );

    return res.modifiedCount > 0;
}

/** Optional: restore a soft-deleted contributor */
export async function restoreContributor(contributorId: string): Promise<boolean> {
    await connectToDb();
    const _id = toObjectId(contributorId);

    const res = await NewsContributor.updateOne(
        { _id },
        { $set: { isDeleted: false } }
    );

    return res.modifiedCount > 0;
}
