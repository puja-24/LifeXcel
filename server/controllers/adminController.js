import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

/**
 * Handles the login request for an admin user.
 * It validates credentials against environment variables and returns a JWT on success.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the provided credentials match the ones in the environment variables.
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        // If credentials are valid, create a JSON Web Token (JWT).
        // It's good practice to add an expiration time to tokens.
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Send the token back to the client.
        res.json({ success: true, token });
        
    } catch (error) {
        // Log the actual error on the server for debugging purposes.
        console.error("Admin login error:", error);
        
        // Send a generic error message to the client.
        res.status(500).json({ success: false, message: "An error occurred during login." });
    }
}
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    res.json({success: true, blogs})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
    res.json({success: true, comments})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
export const getDashboard = async (req, res) => {
  try {
   // This line will now ONLY fetch recent PUBLISHED blogs
const recentBlogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5);
const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments()
    const drafts = await Blog.countDocuments({isPublished: false})

    const dashboardData = {
        blogs, comments, drafts, recentBlogs
    }
    res.json({success: true, dashboardData})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
export const deleteCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    await Comment.findByIdAndDelete(id);
    //Delete all comments associated with the blog
    await Comments.deleteMany({blog: id});
    res.json({success: true, message: "Comment deleted successfully" })
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export const approveCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    await Comment.findByIdAndUpdate(id, {isApproved: true});
    res.json({success: true, message:"Comment deleted successfully" })
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
