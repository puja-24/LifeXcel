

import express from "express";
// Correctly import getPublishedBlogs
import { 
    addBlog, 
    deleteBlogById, 
    getAllBlogs, 
    getPublishedBlogs, // <-- Import this
    getBlogById, 
    getBlogComments,
    addComment, 
    togglePublish, 
    generateContent
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// --- Public Routes ---
// This now correctly uses the function that ONLY gets published blogs
blogRouter.get('/all', getPublishedBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

// --- Admin Routes (Protected by auth middleware) ---
blogRouter.post("/add", auth, upload.single('image'), addBlog);
// This is the new, separate route for your admin panel to get ALL blogs
blogRouter.get("/admin/all", auth, getAllBlogs); 
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('/generate', auth, generateContent);

export default blogRouter;