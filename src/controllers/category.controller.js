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


module.exports={AddCategory}