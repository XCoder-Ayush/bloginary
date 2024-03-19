const multer = require('multer');
const storage=require('../config/multer.config')

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;