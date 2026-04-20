import mongoose from "mongoose";

const mapProjectSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    capacity: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const MapProject = mongoose.models.MapProject || mongoose.model('MapProject', mapProjectSchema);
export default MapProject;
