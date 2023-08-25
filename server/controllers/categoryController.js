const Category = require('../model/categoryModel')



const getAllCategories = async (req, res) =>{

    const {userID} = req.body;
    
    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const categories = await Category.find({userID:userID});

    const newFormatedCategories = [];

    categories.map(object =>{
                newFormatedCategories.push({id: object.id, category:object.category})
            })

    return res.status(200).json(newFormatedCategories);
}

const addNewCategory = async (req, res) =>{

    const {userID, category} = req.body;

    if(!category) return res.json({message: "Field missing", status:422})

    if(!userID) return res.json({message:'UserID not found.', status: 400});

    const doesCategoryExist = await Category.findOne({userID, category})

    if(doesCategoryExist) return res.json({message: 'That category already exists.', status:409})

    await Category.create({userID:userID, category:category});
    return res.json({message: 'Successfully added a new category', status:201})

}

const deleteCategory = async (req, res) =>{

    const {categoryID} = req.body;

    if(!categoryID) return res.json({message: "Category ID missing.", status: 422})

    await Category.findById(categoryID).deleteOne();
    
    return res.json({message: "Successfully deleted the category.", status:200});
    
}


module.exports ={

    getAllCategories,
    addNewCategory,
    deleteCategory
    
}