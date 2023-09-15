import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    url: String,
    headingTitle: String,
    subHeading: String,
    description: String,
    isCustomBanner: {
        type: Boolean,
        default: false
    },
    logo: String
});

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
export default Banner;