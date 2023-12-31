import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    description: String,
    videoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewsCategory"
    },
});

const Video = mongoose.models.Video || mongoose.model('Video', newsSchema);
export default Video;