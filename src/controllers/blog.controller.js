const BlogService = require('../services/blog.service')

function GetAllBlogs(){

}

function GetBlogById(){

}

function DeleteBlogById(){

}

async function AddBlog(request, response){
    try {
        await BlogService.AddBlog(request.body);
        response.status(201).json({ message: "Blog Successfully Added." });
      } catch (error) {
        console.error("Error Adding Blog In Controller", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
}

function UpdateBlogById(){

}

module.exports={
    GetAllBlogs,
    GetBlogById,
    DeleteBlogById,
    AddBlog,
    UpdateBlogById
}