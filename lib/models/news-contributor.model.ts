import mongoose, { Schema, Types } from "mongoose";

export type ContributorRole = "penulis" | "editor";

export interface INewsContributor {
    _id: Types.ObjectId;
    news: Types.ObjectId;           // ref -> News._id
    name: string;                   // contributor display name
    role: ContributorRole;          // "penulis" | "editor"
    email?: string;                 // optional
    isDeleted: boolean;             // soft-delete flag
    createdAt: Date;
    updatedAt: Date;
}

const NewsContributorSchema = new Schema<INewsContributor>(
    {
        news: { type: Schema.Types.ObjectId, ref: "News", required: true, index: true },
        name: { type: String, required: true, trim: true },
        role: { type: String, enum: ["penulis", "editor"], required: true, index: true },
        email: { type: String },
        isDeleted: { type: Boolean, default: false, index: true },
    },
    { timestamps: true }
);

// Optional: avoid duplicated role per news (1 penulis & 1 editor). Remove if you want many.
NewsContributorSchema.index({ news: 1, role: 1 }, { unique: true, partialFilterExpression: { isDeleted: false } });

const NewsContributor =
    (mongoose.models.NewsContributor as mongoose.Model<INewsContributor>) ||
    mongoose.model<INewsContributor>("NewsContributor", NewsContributorSchema);

export default NewsContributor;
