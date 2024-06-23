import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    url: String
});

const ImageModel = mongoose.models.ImageModel || mongoose.model('ImageModel', newsSchema);
export default ImageModel;