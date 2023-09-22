import mongoose from "mongoose";

const newsCategorySchema = new  mongoose.Schema({
    id: {type: String, required: true},
    name: String,
    banner: String,
    description: String,
    news: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News",
        },
    ]
});

const NewsCategory = mongoose.models.NewsCategory || mongoose.model('NewsCategory', newsCategorySchema);
export default NewsCategory;