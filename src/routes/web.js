const express=require('express')
const path=require('path')
const router=express.Router();

// router.get('/',(req,res)=>{
//     console.log(__dirname)
//     res.sendFile(path.join(__dirname, '../public/views/home.html'));
// })

// router.get('/',async(req,res)=>{
    // Fetch Blogs Using Rest Api in Server

    // const resp= await fetch('http://localhost:3001/api/v1/blog')
    // const blogs=await resp.json()
    // console.log(blogs);


    // res.render('home',{'title':'Bloginary'});
// })

// router.get('/auth',(req,res)=>{
//     res.render('login',{'title':'Auth'});
// })

// router.get('/blog/:blogId',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../public/views/blog.html'));
// })

module.exports=router