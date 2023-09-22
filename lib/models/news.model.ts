import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewsCategory"
    }
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);
export default News;