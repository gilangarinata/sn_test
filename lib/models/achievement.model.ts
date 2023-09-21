import mongoose from "mongoose";

const achievementSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    description: String,
    icon: String
});

const Achievement = mongoose.models.Experience || mongoose.model('Achievement', achievementSchema);
export default Achievement;