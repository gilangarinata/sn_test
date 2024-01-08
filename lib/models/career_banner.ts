import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    description: String
});

const CareerBanner = mongoose.models.CareerBanner || mongoose.model('CareerBanner', bannerSchema);
export default CareerBanner;