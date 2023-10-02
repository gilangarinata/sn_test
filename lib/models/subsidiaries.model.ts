import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    description: String,
});

const Subsidiaries = mongoose.models.Subsidiaries || mongoose.model('Subsidiaries', bannerSchema);
export default Subsidiaries;