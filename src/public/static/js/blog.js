const likeIcon= document.querySelector("#like-icon");
const likeSpan= document.querySelector(".like-span");
const likeCount= document.querySelector(".like-count");

const commentIcon= document.querySelector("#comment-icon");
const commentSpan=document.querySelector(".comment-span");

const commentIconWrapper=document.querySelector(".comment-icon-wrapper");
const commentContainer=document.querySelector('.comments-container')

commentIconWrapper.addEventListener('click',()=>{
    // console.log('Here');
    commentContainer.style.display='flex';
})



const commentCount= document.querySelector(".comment-count");
let lCount=0;
let cCount=0;

likeSpan.addEventListener("click", function() {
    lCount++;
    likeCount.textContent=lCount;
    likeIcon.classList.remove('fa-regular');
    likeIcon.classList.add('fa-solid');
    likeIcon.classList.add('clicked');
    
});
likeIcon.addEventListener("click", function() {
    lCount++;
    likeCount.textContent=lCount;
    likeIcon.classList.remove('fa-regular');
    likeIcon.classList.add('fa-solid');
    likeIcon.classList.add('clicked');
});
const commentSection= document.querySelector(".comments-container");
commentSection.style.display = 'none';

commentSpan.addEventListener("click", function() {
    cCount++;
    commentCount.textContent=cCount;
    commentSection.classList.toggle('comments-visible');

})
commentIcon.addEventListener("click", function() {
    cCount++;
    commentCount.textContent=cCount;
    
})

const authorName = document.querySelector(".blog-writer");
function addComment() {
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value;
    const profileImage = document.querySelector("#userImage");
    let imageUrl = profileImage.src;
    
    if (commentText.trim() !== "") {
        const commentList = document.getElementById("commentList");
        const newComment = document.createElement("div");
        newComment.classList.add("postComments");

        const commentImage = document.createElement("img");
        commentImage.setAttribute('src', imageUrl);
        
        const commentDiv= document.createElement("div");
        // commentDiv.textContent = commentText;
        commentDiv.classList.add("post-comment-textarea");
        const author = document.createElement("div");
        author.textContent = authorName.textContent;
        const text = document.createElement("div");
        text.textContent = commentText;
        const timeStamp = document.createElement("div");
        
        
        commentDiv.appendChild(author);
        commentDiv.appendChild(text);
        commentDiv.appendChild(timeStamp);
        newComment.appendChild(commentImage);
        newComment.appendChild(commentDiv);
        commentList.appendChild(newComment);
        commentInput.value = "";
        imageUrl = "";
    }
}
