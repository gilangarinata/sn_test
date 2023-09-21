import mongoose from "mongoose";

const experienceSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    description: String,
    total: String,
    icon: String
});

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export default Experience;