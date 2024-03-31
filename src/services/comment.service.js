const CommentRepository=require('../repositories/comment.repository')
const BlogService=require('../services/blog.service')

async function AddComment(comment, replyFlag){
    try {
        const savedComment=await CommentRepository.AddComment(comment)
        // Comment Has Been Added.
        // savedComment._id
        if(!replyFlag){
            const blogId=comment.blog;
            // Fetch The Blog with id=blogId -> BlogService
            const savedBlog=await BlogService.UpdateBlogComment(savedComment._id, blogId);
        }
        return savedComment;
    } catch (error) {
        console.error("Error Saving Comment In Service", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }    
}
async function GetCommentById(id){
    try{
        const comment=await CommentRepository.GetCommentById(id);
        return comment;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}
async function UpdateCommentLikeCount(commentId, username){
    try{
        // Fetch comment From DB:

        const comment=await CommentRepository.GetCommentById(commentId);
        // Check In Likes Array For username:
        let alreadyLiked = false;
        console.log(comment);
        comment.likes.forEach((userId, index) => {
            if (userId === username) {
                alreadyLiked = true;
                // Remove the username from the likes array
                comment.likes.splice(index, 1);
            }
        });
        console.log(alreadyLiked);
        if (!alreadyLiked) {
            // If user has not liked the comment yet, add the username to likes
            comment.likes.push(username);
        }

        const savedComment=await CommentRepository.AddComment(comment)
        return savedComment;
    }catch(error){
        console.error("Internal Server Error:", error);
        throw error;
    }
}

async function UpdateCommentThread(threadId, commentId){
    try {
        const comment=await CommentRepository.GetCommentById(threadId);
        comment.replies.push(commentId)
        const savedComment=await CommentRepository.AddComment(comment)
        return savedComment;
    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}
module.exports={AddComment, GetCommentById, UpdateCommentLikeCount, UpdateCommentThread}