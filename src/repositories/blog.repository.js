const Blog = require("../models/blog.model");

async function GetAllBlogs(){
    try {
        const blogs = await Blog.find({});
        
        if (!blogs || blogs.length === 0) {
            console.error("No users found in the database");
        }

        return blogs;
    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}

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
async function UpdateBlog(blog) {
    try {
        // Destructure the _id field from the blog object
        const { _id, ...updatedFields } = blog;

        // Use findByIdAndUpdate to find the existing blog by its ID and update its fields
        const updatedBlog = await Blog.findByIdAndUpdate(
            _id,
            { $set: updatedFields },
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            throw new Error("Blog not found"); // Throw an error if the blog with the provided ID doesn't exist
        }

        console.log("Blog Updated Successfully:", updatedBlog);
        return updatedBlog;
    } catch (error) {
        console.error("Error Updating Blog In Repo", error);
        throw error;
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
async function GetBlogByBlogId(id) {
    try {
        // const blog = await Blog.findOne({id});
        const blog = await Blog.findOne({id});
        console.log(blog);
        if (!blog) {
            console.error("Blog Not Found In DB With Blog Id : ", id);
        }
        return blog;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}

module.exports={AddBlog , GetBlogById, GetAllBlogs, GetBlogByBlogId, UpdateBlog}