import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    title: String,
    subtitle: String,
    description: String,
});

const SolarPowerWorksModel = mongoose.models.SolarPowerWorksModel || mongoose.model('SolarPowerWorksModel', bannerSchema);
export default SolarPowerWorksModel;