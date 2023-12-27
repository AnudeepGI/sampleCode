const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Function to generate a unique filename
const uniqueFilename = (originalName) => {
    return Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(originalName);
};

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uniqueFilename(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

