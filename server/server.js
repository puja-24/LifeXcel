import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js'
import adminRouter from './routes/adminRoutes.js';
// The duplicate 'import cors from 'cors'' has been removed from here.
import blogRouter from './routes/blogRoutes.js';

// ADD THIS LINE FOR TESTING
// console.log("MONGODB_URL is:", process.env.MONGODB_URL); 

const app = express();

await connectDB()
// Middleware
// This allows your server to accept requests from different origins.
app.use(cors());
// This allows your server to parse incoming JSON payloads.
app.use(express.json());

// A simple route to check if the server is running.
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
// Define the port the server will run on.
// It will use the port from environment variables if available, otherwise it defaults to 3000.
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests.
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT); // Added a space for better readability.
});

// Export the app instance, which can be useful for testing or other integrations.
export default app;



