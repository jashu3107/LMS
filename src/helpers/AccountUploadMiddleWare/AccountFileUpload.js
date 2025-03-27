const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../../../uploads/transactions');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer upload middleware
const upload = multer({ storage: storage }).single('lastThrityDayTransactions');

// Export middleware to use in routes
const AccountFileUpload = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return res.status(500).send("Error uploading file.");
        }
        console.log("File upload middleware hit:", req.file); // Log the file info
        next();
    });
};

module.exports = AccountFileUpload;
