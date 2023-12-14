import mongoose from "mongoose";

const newsSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: String,
    address: String,
    lastEducation: String,
    campus: String,
    studyMajor: String,
    schoolStartYear1: String,
    schoolStartYear2: String,
    schoolEndYear1: String,
    schoolEndYear2: String,
    previousCompany: String,
    previousDesignation: String,
    availabilityPeriod: String,
    urlSites: String,
    howDidYouKnow: String,
    resume: String,
    portfolio: String,
    ijazah: String,
    transkrip: String,
    type: String,
    division: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    testResult: String,
});

const CareerRegister = mongoose.models.CareerRegister || mongoose.model('CareerRegister', newsSchema);
export default CareerRegister;