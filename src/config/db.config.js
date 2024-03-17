const ServerConfig=require('./server.config')
const mongoose=require('mongoose')
// Connect to MongoDB using Mongoose

function connectToDatabase(){
    mongoose.connect(ServerConfig.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error Connecting To MongoDB:', error);
      });
}

module.exports=connectToDatabase;

