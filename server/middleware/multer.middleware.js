import multer from "multer";

const minSize = 10 * 1024; // 10 KB in bytes
const maxSize = 100 * 1024; // 100 KB in bytes

// Configure the storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where files will be saved
        cb(null, './utils/files');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the current timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Save the file with the format: [fieldname]-[uniqueSuffix]-[originalFilename]
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

// Combine MIME type and file size filtering in a single function
const fileFilter = (req, file, cb) => {
    // Check the MIME type of the uploaded file
    if (file.mimetype !== 'text/plain') {
        // Reject the file (it's not a text file)
        cb(new Error('Only text files are allowed!'), false);
        return;
    }
    // Check the size of the uploaded file
    if (file.size < minSize || file.size > maxSize) {
        // Reject the file if it doesn't meet the size restrictions
        cb(new Error(`File size must be between 10 KB and 100 KB.`), false);
        return;
    }
    // Allow the file to be uploaded
    cb(null, true);
};

// Create a Multer instance with the specified storage and file filter
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize, // Specify maximum allowed file size
    }
});

// Export the upload middleware for use in your routes
