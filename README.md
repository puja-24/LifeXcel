LifeXcel - AI-Powered Blogging Platform
An intelligent, full-stack blogging platform built with the MERN stack. LifeXcel leverages the power of Google's Gemini API for AI-assisted content creation and ImageKit for fast, optimized image delivery.

(Note: You should replace the link above with a real screenshot of your application!)

About The Project
LifeXcel is where your journey to excellence finds its voice. It's a seamless, AI-enhanced platform designed for users to share their goals, progress, and stories. From daily habits to major breakthroughs, this is a space to document, connect, and inspire others on their own paths to success.

The project features a clean, modern frontend built with React and a robust backend powered by Node.js and Express, complete with a secure admin dashboard for comprehensive content management.

Key Features
User-Facing:

Modern & Responsive UI: Built with React and styled with Tailwind CSS for a beautiful experience on any device.

Dynamic Blog Feed: Fetches and displays all published blog posts.

Advanced Filtering & Search: Users can filter blogs by category or search by keywords in the title or category.

Interactive Comment System: Users can read and post comments on individual blog posts.

Newsletter Subscription: A dedicated section for users to subscribe for updates.

Admin Panel:

Secure Authentication: JWT-based login for the admin dashboard.

Content Management: A full CRUD (Create, Read, Update, Delete) interface for blog posts.

Rich Text Editor: Uses Quill.js for a seamless writing experience.

AI Content Generation: Integrated with the Google Gemini API to generate blog post descriptions from just a title.

Cloud Image Uploads: Uses ImageKit for fast, optimized, and reliable image hosting.

Publishing Control: Admins can toggle the publish status of any blog post.

Comment Moderation: Admins can view all comments and approve or delete them.

Tech Stack
Frontend: React, React Router, Tailwind CSS, Axios, Framer Motion

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

APIs & Services:

Google Gemini: For AI content generation.

ImageKit: For cloud-based image storage and delivery.

Authentication: JSON Web Tokens (JWT)

File Handling: Multer

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm

MongoDB (local instance or a cloud service like MongoDB Atlas)

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Backend Setup:

Navigate to the server directory: cd server

Install NPM packages: npm install

Create a .env file in the server directory and add the following variables:

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key

# ImageKit Credentials
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
Start the backend server: npm start

Frontend Setup:

Navigate to the client directory: cd ../client (or the root if your React app is there)

Install NPM packages: npm install

Create a .env file in the client (or root) directory and add the backend URL:

Code snippet

VITE_BASE_URL=http://localhost:4000
Start the frontend development server: npm run dev

Your application should now be running, with the frontend on http://localhost:5173 (or your default Vite port) and the backend on http://localhost:4000.

License
Distributed under the MIT License. See LICENSE.txt for more information.

