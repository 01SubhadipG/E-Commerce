//Multer is a Node.js middleware for handling multipart/form-data (file uploads), especially in Express.js applications. It processes incoming files from HTML forms, parsing them into the req.body and req.file or req.files objects. Multer simplifies storing uploaded files on the local file system, in memory, or in cloud storage, offering features like file size limits and multi-file uploads.

import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {  //cb - callback
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

const upload = multer({
    storage: storage,
    // fileFilter: fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

export default upload;