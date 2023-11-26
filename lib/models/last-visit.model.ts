import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    last_visit_career: {
        type: Date,
        default: Date.now,
    },
    last_visit_get_in_touch: {
        type: Date,
        default: Date.now,
    },
});

const LastVisit = mongoose.models.LastVisit || mongoose.model('LastVisit', bannerSchema);
export default LastVisit;