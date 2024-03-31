const CommentService=require('../services/comment.service')

async function AddComment(request, response){
    try {
      console.log(request.body);
        const comment = await CommentService.AddComment(request.body,false);
        response.status(201).json({ success:true, comment: comment });
      } catch (error) {
        console.error("Error Adding Comment In Controller", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
}
async function GetCommentById(request,response){
  try {
    const comment = await CommentService.GetCommentById(request.params.id);
    console.log(comment);
    response.status(200).json(comment);
  } catch (error) {
    console.error("Error Fetching Comment In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
async function UpdateCommentLikeCount(request, response) {
  const commentId = request.body.id;
  const username = request.body.username;
  console.log(commentId);
  console.log(username);
  try {
    const comment = await CommentService.UpdateCommentLikeCount(commentId, username);
    response.status(201).json({ success: true, comment: comment });
  } catch (error) {
    console.error("Error Liking Comment In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function UpdateCommentThread(request, response){
  const threadId=request.body.threadId;
  const comment=request.body.comment;
  try {
    // Add The Comment:
    const savedComment=await CommentService.AddComment(comment,true);
    // Update In Replies Array Of Thread:
    const thread=await CommentService.UpdateCommentThread(threadId,savedComment._id);
    response.status(201).json({ success: true, thread: thread });
  } catch (error) {
    // Rollback Should Be A Transaction:
  }
}
module.exports={ AddComment, GetCommentById , UpdateCommentLikeCount, UpdateCommentThread}