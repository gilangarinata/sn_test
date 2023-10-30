import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    description: String,
    location: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departement"
    }
});

const Career = mongoose.models.Career || mongoose.model('Career', newsSchema);
export default Career;