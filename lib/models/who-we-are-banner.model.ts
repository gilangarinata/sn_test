import mongoose from "mongoose";

const bannerSchema = new  mongoose.Schema({
    id: {type: String, required: true},
    image: String,
    url: String,
    headingTitle: String,
    bannerHeadingTitle: String,
    description: String,

    vision: String,
    mission: String,

    messageDirectorTitle: String,
    messageDirectorDescription: String,
    companyProfileUrl: String
});

const WhoWeAre = mongoose.models.WhoWeAre || mongoose.model('WhoWeAre', bannerSchema);
export default WhoWeAre;