const CommentService=require('../services/comment.service')

async function AddComment(request, response){
    try {
        await CommentService.AddComment(request.body);
        response.status(201).json({ message: "Comment Successfully Added." });
      } catch (error) {
        console.error("Error Adding Comment In Controller", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports={ AddComment }