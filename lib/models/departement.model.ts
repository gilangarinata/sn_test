import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    name: String
});

const Departement = mongoose.models.Departement || mongoose.model('Departement', bannerSchema);
export default Departement;