const Comment = require("../models/comment.model");

async function AddComment(comment){
    try {
        const newComment = new Comment(comment);
        const savedComment = await newComment.save();
        console.log("Comment Added Successfully:", savedComment);
        return savedComment; // Return the saved user for potential further use
    } catch (error) {
        console.error("Error Saving Blog In Repo", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}
async function GetCommentById(id) {
    try {
        const comment = await Comment.findById(id);
        console.log('Inside Comment Repo: ',comment);
        if (!comment) {
            console.error("Comment Not Found In DB With Id : ", id);
        }
        return comment;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}
module.exports={AddComment, GetCommentById}