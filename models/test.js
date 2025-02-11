const mongoose = require("mongoose");
const Listing = require("./listing"); // Update this path

async function fixImageField() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB...");

        // Fix the image field in existing documents
        const result = await Listing.updateMany(
            { "image.image": { $exists: true } }, // Find documents where image is an object
            [{ $set: { image: "$image.image" } }] // Convert `image.image` into a simple string
        );

        console.log(`Updated ${result.modifiedCount} documents.`);
        mongoose.connection.close();
    } catch (err) {
        console.error("Error updating documents:", err);
        mongoose.connection.close();
    }
}

fixImageField();
