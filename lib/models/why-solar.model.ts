import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    icon: String,
    title: String,
    description: String,
});

const WhySolarModel = mongoose.models.WhySolarModel || mongoose.model('WhySolarModel', bannerSchema);
export default WhySolarModel;