const Category = require('../models/category.model');
const AppError = require('../utils/AppError');
const {StatusCodes} = require('http-status-codes');
const applyApiFeatures = require('../utils/apiFeatures');


const createCategory  = async (req, res, next) => {
        const {name} = req.body;
    try{
        if(!name || !name.trim()){
            throw new AppError('Category name is required', StatusCodes.BAD_REQUEST)
        }
        const category = await Category.create({name});
        
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: category
        })
    }catch(error){
        next(error)
    }
}
const getAllCategories = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || 'asc';
    const sortOrder = sort === 'desc' ? -1 : 1;
  
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([Category.find({ isDeleted: false })
      .sort({ name: sortOrder })
      .skip(skip)
      .limit(limit)
    ,
    Category.countDocuments({isDeleted: false})
    ])

    res.status(StatusCodes.OK).json({
      success: true,
      page,
      limit,
      total,
      count: categories.length,
      data: categories
    });

  } catch (error) {
    next(error);
  }
};


const getCategory =  async (req, res, next) => {
    try{
        const { id } = req.params;

        const category = await Category.findOne({_id: id, isDeleted: false });
        
        if(!category){
            throw new AppError('Category not found!', StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: category
        })

    }catch(error){
        next(error)
    }
}


const deleteCategory =  async (req, res, next) => {
    try{
        const {id} = req.params;

        const category = await Category.findOneAndUpdate({_id: id, isDeleted: false}, {isDeleted: true},{new:true});

        if(!category){ 
            throw new AppError('Category not found!', StatusCodes.NOT_FOUND)
        }


        res.status(StatusCodes.OK).json({
            success: true,
            message: "Category deleted Sucessfully"
        })
    }catch(error){
        next(error);
    }
}
const getCategorySubCategoryCount = async (req, res, next) => {
  try {
    const result = await Category.aggregate([
      {
        $match: { isDeleted: false }
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'category',
          as: 'subCategories'
        }
      },
      {
        $project: {
          name: 1,
          subCategoryCount: { $size: '$subCategories' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    getCategorySubCategoryCount
}