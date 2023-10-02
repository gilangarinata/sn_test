import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    description: String,
    title: String
});

const OurDna = mongoose.models.OurDna || mongoose.model('OurDna', bannerSchema);
export default OurDna;