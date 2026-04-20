import mongoose from "mongoose";

const zeroCapexBannerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    image: { type: String },
    backgroundImage: { type: String },
    headingTitle: { type: String },
    description: { type: String },
}, { timestamps: true });

const ZeroCapexBanner = mongoose.models.ZeroCapexBanner || mongoose.model("ZeroCapexBanner", zeroCapexBannerSchema);

export default ZeroCapexBanner;
