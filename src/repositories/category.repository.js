const Category = require("../models/category.model");

async function AddCategory(category){
    try {
        const newCategory = new Category(category);
        const savedCategory = await newCategory.save();
        console.log("Category Added Successfully:", savedCategory);
        return savedCategory; // Return the saved user for potential further use
    } catch (error) {
        console.error("Error Saving Category In Repo", error);
        throw error; // Throw the error to be caught by the caller (UserService)
    }
}

async function GetCategoryById(id) {
    try {
        // const Category = await Category.findOne({id});
        const category = await Category.findById(id);
        console.log(category);
        if (!category) {
            console.error("Category Not Found In DB With Id : ", id);
        }
        return category;

    } catch (error) {
        console.error("Internal Server Error:", error);
        throw error;
    }
}


module.exports={AddCategory, GetCategoryById}