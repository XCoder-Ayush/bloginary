const CommentService=require('../services/comment.service')

async function AddComment(request, response){
    try {
      console.log(request.body);
        const comment = await CommentService.AddComment(request.body);
        response.status(201).json({ success:true, comment: comment });
      } catch (error) {
        console.error("Error Adding Comment In Controller", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports={ AddComment }