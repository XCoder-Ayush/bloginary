const ServerConfig=require('./config/server.config')
const cors=require('cors')

const express=require('express')
const app=express();

const PORT= ServerConfig.PORT || 3000

app.use(express.json())
app.use(cors())

const router=require('./routes/index')
const connectToDatabase=require('./config/db.config')

// app.get('/',(req,res)=>{
//     res.json({'message' : 'Thala'})
// })


// app.post('/api/v1/blog/:id',(req,res)=>{
//     //URL Params 
//     console.log(req.params);
//     // Query Params
//     console.log(req.query);
//     // Req Body:
//     console.log(req.body);

//     res.json({'message' : `Service Is Healthy :) And ${req.params.id}`})
// })

app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`);
    connectToDatabase();
})

