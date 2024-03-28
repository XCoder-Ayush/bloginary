const CategoryService=require('../services/category.service')

async function AddCategory(request, response){
    try {
        await CategoryService.AddCategory(request.body);
        response.status(201).json({ message: "Category Successfully Added." });
      } catch (error) {
        console.error("Error Adding Category In Controller", error);
        response.status(500).json({ message: "Internal Server Error" });
      }
}

async function GetCategoryById(request,response){
  try {
    const category = await CategoryService.GetCategoryById(request.params.id);
    response.status(200).json(category);
  } catch (error) {
    console.error("Error Fetching Category In Controller", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports={AddCategory, GetCategoryById}