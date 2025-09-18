import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: {
        type: Date,
    },
    namaPerusahaan: {
        type: String,
        required: true,
        default: "Unknown Company"   // ✅ default value
    },
});

const GetInTouch = mongoose.models.GetInTouch || mongoose.model('GetInTouch', bannerSchema);
export default GetInTouch;