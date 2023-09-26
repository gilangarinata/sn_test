import mongoose from "mongoose";

const tagSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    tag: String,
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
    }
});

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
export default Tag;