import mongoose from "mongoose";

// Define the schema for the Comment collection.
const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog', // Changed to capitalized 'Blog' for consistency
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Comment model using the robust pattern.
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;