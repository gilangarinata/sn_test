import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    url: String,
    description: String,
});

const OurBusinessBanner = mongoose.models.OurBusinessBanner || mongoose.model('OurBusinessBanner', bannerSchema);
export default OurBusinessBanner;