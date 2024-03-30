const BlogRepository=require('../repositories/blog.repository')
const CategoryService=require('../services/category.service')

async function GetAllBlogs(){
    try{
        const blogs=await BlogRepository.GetAllBlogs();
        return blogs;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }

}

async function AddBlog(blog){
    try {
        const savedBlog=await BlogRepository.AddBlog(blog)
        console.log('SAVED BLOG ',savedBlog);
        
        await Promise.all(blog.categories.map(async (category_id) => {
            const category = await CategoryService.GetCategoryById(category_id);
            console.log('Fetched Category');
            console.log(category);
            console.log(category.id);

            category.blogs.push(savedBlog._id);
            await CategoryService.AddCategory(category);
        }));


        // console.log();
        // await BlogRepository.AddBlog(blog)

        // blog.categories.forEach(async (category_id) => {
        //     const category = await CategoryService.GetCategoryById(category_id);
        //     category.blogs.push(blog._id);
        //     await CategoryService.AddCategory(category);
        // });

    } catch (error) {
        console.error("Error Saving Blog In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }    
}

async function GetBlogById(id){
    try{
        const blog=await BlogRepository.GetBlogById(id);
        // console.log(user);
        return blog;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function UpdateBlogComment(commentId,blogId){
    // Logged In Condition 
    try{
        const blog=await BlogRepository.GetBlogById(blogId);
        blog.comments.push(commentId)
        const savedBlog=await BlogRepository.AddBlog(blog)
        console.log(savedBlog);
        return savedBlog;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
    
}
async function UpdateBlogLikeCount(blogId, username){
    try{
        // Fetch Blog From DB:

        const blog=await BlogRepository.GetBlogById(blogId);
        // Check In Likes Array For username:
        let alreadyLiked = false;
        console.log(blog);
        blog.likes.forEach((userId, index) => {
            if (userId === username) {
                alreadyLiked = true;
                // Remove the username from the likes array
                blog.likes.splice(index, 1);
            }
        });
        console.log(alreadyLiked);
        if (!alreadyLiked) {
            // If user has not liked the blog yet, add the username to likes
            blog.likes.push(username);
        }

        const savedBlog=await BlogRepository.AddBlog(blog)
        return savedBlog;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}
module.exports={AddBlog , GetBlogById , GetAllBlogs, UpdateBlogLikeCount, UpdateBlogComment}