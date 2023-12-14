import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    question: String,
});

const CareerQuestion = mongoose.models.CareerQuestion || mongoose.model('CareerQuestion', bannerSchema);
export default CareerQuestion;