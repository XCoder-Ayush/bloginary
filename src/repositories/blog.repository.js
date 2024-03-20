const Blog = require("../models/blog.model");

async function AddBlog(blog){
    try {
        const newBlog = new Blog(blog);
        const savedBlog = await newBlog.save();
        console.log("Blog Added Successfully:", savedBlog);
        return savedBlog; // Return the saved user for potential further use
    } catch (error) {
        console.error("Error Saving Blog In Repo", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}

async function GetBlogById(id) {
    try {
        // const blog = await Blog.findOne({id});
        const blog = await Blog.findById(id);
        console.log(blog);
        if (!blog) {
            console.error("Blog Not Found In DB With Id : ", id);
        }
        return blog;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}
module.exports={AddBlog , GetBlogById}