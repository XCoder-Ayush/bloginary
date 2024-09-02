const dotenv = require("dotenv");
const path = require("path");
// dotenv.config();
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });

const ServerConfig = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SESSION_SECRET: process.env.SESSION_SECRET,
  OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = ServerConfig;
