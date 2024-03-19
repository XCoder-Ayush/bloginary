const cloudinary = require('cloudinary').v2;
const ServerConfig = require('./server.config')

cloudinary.config({
  cloud_name: ServerConfig.CLOUDINARY_CLOUD_NAME,
  api_key: ServerConfig.CLOUDINARY_API_KEY,
  api_secret: ServerConfig.CLOUDINARY_API_SECRET
});

module.exports=cloudinary