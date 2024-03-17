const dotenv=require('dotenv')
dotenv.config();

const ServerConfig={
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}

module.exports=ServerConfig;
