const CategoryRepository=require('../repositories/category.repository')
const BlogService=require('../services/blog.service')

async function AddCategory(category){
    try {
        const savedCategory=await CategoryRepository.AddCategory(category)
        // Comment Has Been Added.
        // savedComment._id
        // const blogId=category.blog;
        // // Fetch The Blog with id=blogId -> BlogService
        // const blog=await BlogService.GetBlogById(blogId);
        // // Fetched blog er comments array te savedComment._id push kora
        // blog.category.push(savedComment._id)
        
        // //Update Blog(Save in DB)
        // const savedBlog = BlogService.AddBlog(blog);
    } catch (error) {
        console.error("Error Saving Comment In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }    
}

async function GetCategoryById(id){
    try{
        const category=await CategoryRepository.GetCategoryById(id);
        // console.log(user);
        return category;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

module.exports={ AddCategory , GetCategoryById}