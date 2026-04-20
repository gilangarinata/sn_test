const mongoose = require('mongoose');

// Define temporary models to avoid dependency issues in scratch script
const NewsCategorySchema = new mongoose.Schema({
    name: String,
    type: String
}, { collection: 'newscategories' });

const NewsSchema = new mongoose.Schema({
    title: String,
    category: mongoose.Schema.Types.ObjectId,
    status: String
}, { collection: 'news' });

const NewsCategory = mongoose.models.NewsCategory || mongoose.model('NewsCategory', NewsCategorySchema);
const News = mongoose.models.News || mongoose.model('News', NewsSchema);

async function inspect() {
    try {
        const mongoUrl = 'mongodb://sesna:sesna@193.203.163.79:27017/sesna-db?authSource=admin';
        await mongoose.connect(mongoUrl);
        console.log("Connected to DB");

        const categories = await NewsCategory.find();
        console.log("\n--- News Categories ---");
        for (const cat of categories) {
            const newsCount = await News.countDocuments({ category: cat._id });
            console.log(`ID: ${cat._id}, Name: "${cat.name}", Type: ${cat.type}, News Count: ${newsCount}`);
        }

        const sampleNews = await News.find().limit(5).populate('category');
        console.log("\n--- Sample News ---");
        sampleNews.forEach(n => {
            console.log(`Title: ${n.title}, Category ID: ${n.category?._id}, Category Name: ${n.category?.name}, Status: ${n.status}`);
        });

        const testName = "Pertambangan";
        const escapedCategoryName = testName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        
        // Match English part OR Indonesian part
        const regex = new RegExp(`(^|\\b|\\|\\[\\[)${escapedCategoryName}(\\]\\]|\\b|$)`, 'i');
        // Let's try an even simpler one that matches the name anywhere but specifically handles the [[ format
        const betterRegex = new RegExp(`(^|\\b|\\[\\[)${escapedCategoryName}(\\]\\]|\\b|$)`, 'i');

        console.log(`\nTesting regex: ${betterRegex}`);
        const matchedCat = await NewsCategory.findOne({ name: { $regex: betterRegex }, type: 'news' });
        console.log(`Match for "${testName}":`, matchedCat ? `FOUND (ID: ${matchedCat._id}, Name: "${matchedCat.name}")` : "NOT FOUND");

        const testName2 = "Mining";
        const matchedCat2 = await NewsCategory.findOne({ name: { $regex: betterRegex.source.replace("Pertambangan", testName2), $options: 'i' }, type: 'news' });
        console.log(`Match for "${testName2}":`, matchedCat2 ? `FOUND (ID: ${matchedCat2._id}, Name: "${matchedCat2.name}")` : "NOT FOUND");

        process.exit(0);
    } catch (err) {
        console.error("Error during inspection:", err);
        process.exit(1);
    }
}

inspect();
