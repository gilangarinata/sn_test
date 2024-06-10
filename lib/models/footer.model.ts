import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    address: String,
    address2: String,
    email: String,
    phone: String,
    whatsapp: String
});

const Footer = mongoose.models.Footer || mongoose.model('Footer', bannerSchema);
export default Footer;