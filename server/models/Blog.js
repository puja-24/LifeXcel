import mongoose from "mongoose";

// Define the schema for the Blog collection.
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: false // Subtitles are often optional
    },
    description: {
        type: String, // Corrected: Was 'string'
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // image: {
    //     url: { type: String, required: true },
    //     fileId: { type: String, required: true }
    // },
     image: {
        url: { type: String, required: true },
        fileId: { type: String, required: true }
    },
    isPublished: { // Corrected: Typo was 'iPublished'
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Blog model.
// This is a robust way to create a model that prevents errors in development.
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
