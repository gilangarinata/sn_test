const mongoose = require('mongoose');

// Define temporary models to avoid dependency issues in scratch script
const NewsCategorySchema = new mongoose.Schema({
    name: String,
    type: String
}, { collection: 'newscategories' });

const VideoSchema = new mongoose.Schema({
    title: String,
    category: mongoose.Schema.Types.ObjectId,
    status: String,
    videoUrl: String
}, { collection: 'videos' });

const NewsCategory = mongoose.models.NewsCategory || mongoose.model('NewsCategory', NewsCategorySchema);
const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);

async function inspect() {
    try {
        const mongoUrl = 'mongodb://sesna:sesna@193.203.163.79:27017/sesna-db?authSource=admin';
        await mongoose.connect(mongoUrl);
        console.log("Connected to DB");

        const categories = await NewsCategory.find();
        console.log("\n--- Media Categories ---");
        for (const cat of categories) {
            const videoCount = await Video.countDocuments({ category: cat._id });
            console.log(`ID: ${cat._id}, Name: "${cat.name}", Type: ${cat.type}, Video Count: ${videoCount}`);
        }

        const searchTerm = "Komersial & Industri";
        const escapedCategoryName = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const betterRegex = new RegExp(`(^|\\b|\\[\\[)${escapedCategoryName}(\\]\\]|\\b|$)`, 'i');
        
        console.log(`\nTesting regex: ${betterRegex} for "${searchTerm}"`);
        const matchedCats = await NewsCategory.find({ name: { $regex: betterRegex }, type: 'video' });
        console.log(`Matches found: ${matchedCats.length}`);
        matchedCats.forEach(c => console.log(`- ID: ${c._id}, Name: "${c.name}"`));

        if (matchedCats.length > 0) {
            const videos = await Video.find({ category: matchedCats[0]._id });
            console.log(`\n--- Videos in first matched category (${matchedCats[0].name}) ---`);
            videos.forEach(v => console.log(`Title: ${v.title}, Status: ${v.status}`));
        }

        process.exit(0);
    } catch (err) {
        console.error("Error during inspection:", err);
        process.exit(1);
    }
}

inspect();
