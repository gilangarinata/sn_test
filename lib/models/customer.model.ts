import mongoose from "mongoose";

const customerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    icon: String,
    url: String
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;