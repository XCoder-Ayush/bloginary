const BlogService = require("../services/blog.service");

async function GetAllBlogs(request, response) {
  try {
    // Your code to fetch user by ID
    const blogs = await BlogService.GetAllBlogs();

    // If user not found
    if (!blogs) {
      console.error("No blogs in DB : ");
      response.status(404).json({ message: "Blogs Not Found" });
      return;
    }

    // If user found, return user data
    response.status(200).json(blogs);
  } catch (error) {
    console.error("Internal Server Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

async function GetBlogById(request, response) {
  try {
    const blog = await BlogService.GetBlogById(request.params.id);
    response.status(200).json(blog);
  } catch (error) {
    console.error("Error Fetching Blog In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

function DeleteBlogById() {}

async function AddBlog(request, response) {
  try {
    await BlogService.AddBlog(request.body);
    response.status(201).json({ message: "Blog Successfully Added." });
  } catch (error) {
    console.error("Error Adding Blog In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

function UpdateBlogById() {}

async function UpdateBlogLikeCount(request, response) {
  const blogId = request.body.id;
  const username = request.body.username;
  console.log(blogId);
  console.log(username);
  try {
    const blog = await BlogService.UpdateBlogLikeCount(blogId, username);
    response.status(201).json({ success: true, blog: blog });
  } catch (error) {
    console.error("Error Liking Blog In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  GetAllBlogs,
  GetBlogById,
  DeleteBlogById,
  AddBlog,
  UpdateBlogById,
  UpdateBlogLikeCount,
};
