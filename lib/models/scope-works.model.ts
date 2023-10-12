import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    title: String,
    description: String,
});

const ScopeWorks = mongoose.models.ScopeWorks || mongoose.model('ScopeWorks', bannerSchema);
export default ScopeWorks;