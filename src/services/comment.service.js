const CommentRepository=require('../repositories/comment.repository')
const BlogService=require('../services/blog.service')

async function AddComment(comment){
    try {
        const savedComment=await CommentRepository.AddComment(comment)
        // Comment Has Been Added.
        // savedComment._id
        const blogId=comment.blog;
        // Fetch The Blog with id=blogId -> BlogService
        const savedBlog=await BlogService.UpdateBlogComment(savedComment._id, blogId);
        return savedComment
    } catch (error) {
        console.error("Error Saving Comment In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }    
}

module.exports={AddComment}