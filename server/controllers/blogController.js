
import fs from 'fs';
import imagekit from '../config/ImageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../config/Gemini.js';
/**
 * Handles the creation of a new blog post.
 */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: imageFile.buffer, // Use buffer directly from memory (if using multer.memoryStorage)
      fileName: imageFile.originalname,
      folder: "/blogs"
    });

    // Generate an optimized image URL from ImageKit
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' }
      ]
    });

    // Create the blog post in the database
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: {
        url: optimizedImageUrl,
        fileId: response.fileId // Important: Store the fileId for deletion
      }
    });

    res.status(201).json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: "Failed to add blog." });
  }
};

/**
 * Fetches ALL blog posts (published or not). For admin use.
 */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Fetches only PUBLISHED blog posts. For public use.
 */
export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Fetches a single blog post by its unique ID.
 */
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Deletes a blog post and its associated resources (ImageKit image, comments).
 */
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body; // Assuming ID comes from the request body for admin actions

    // 1. Find the blog post to get its details
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // 2. Delete the associated image from ImageKit
    if (blog.image && blog.image.fileId) {
      await imagekit.deleteFile(blog.image.fileId);
    }
    
    // 3. Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    // 4. Delete the blog post from the database
    await Blog.findByIdAndDelete(id);

    res.json({ success: true, message: 'Blog and all associated data deleted successfully' });

  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog." });
  }
};

/**
 * Toggles the 'isPublished' status of a blog post.
 */
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();
    
    const message = `Blog has been successfully ${blog.isPublished ? 'published' : 'unpublished'}.`;
    res.json({ success: true, message });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Adds a new comment to a blog post.
 */
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
  
    if (!blog || !name || !content) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await Comment.create({ blog, name, content });
    res.json({ success: true, message:'Comment added for review' });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * Fetches all approved comments for a specific blog post.
 */
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body; // Assuming blogId comes from the request body

    const comments = await Comment.find({ blog: blogId, isApproved: true })
                                   .sort({ createdAt: -1 });

    res.json({ success: true, comments });

  } catch (error) {
    console.error("Error fetching blog comments:", error);
    res.json({ success: false, message: "Failed to fetch comments." });
  }
};

export const generateContent = async (req,res) => {
try{
const {prompt} = req.body;
const content = await main(prompt+'Generate a blog content for this topic in simple text format')
res.json({success: true, content})
}
catch(error){
res.json({success: false,message: error.message})
}
}