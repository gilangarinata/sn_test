import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    title: String,
    link: String,
});

const OurExperience = mongoose.models.OurExperience || mongoose.model('OurExperience', bannerSchema);
export default OurExperience;