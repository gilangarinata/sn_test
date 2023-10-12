import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    name: String,
    email: String,
    phone: String,
    message: String,
});

const GetInTouch = mongoose.models.GetInTouch || mongoose.model('GetInTouch', bannerSchema);
export default GetInTouch;