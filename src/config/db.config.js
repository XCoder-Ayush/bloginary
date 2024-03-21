const ServerConfig=require('./server.config')
const mongoose=require('mongoose')
// Connect to MongoDB using Mongoose

function connectToDatabase(){
    mongoose.connect(ServerConfig.MONGO_URL)
      .then(() => {
        console.log('Connected To Database Successfully');
      })
      .catch((error) => {
        console.error('Error Connecting To MongoDB:', error);
      });
      // mongoose.connect(ServerConfig.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify:true
      // })
      // const connection=mongoose.connection;
      // connection.once('open',()=>{
      //   console.log('Connected To Database Successfully');
      // }).catch((err)=>{
      //   console.log('Database Connection Error',err);
      // })
    }

module.exports=connectToDatabase;

