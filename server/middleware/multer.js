// import multer from "multer";
 
// const upload = multer({storage: multer.diskStorage({})})

// export default upload;

import multer from 'multer';

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage();

// Create the multer instance with the correct storage engine
const upload = multer({ storage: storage });

export default upload;