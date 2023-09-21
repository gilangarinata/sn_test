import mongoose from "mongoose";

const customerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    title: String,
    icon: String,
    url: String
});

const Customer = mongoose.models.Experience || mongoose.model('Customers', customerSchema);
export default Customer;