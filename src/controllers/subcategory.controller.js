const SubCategory = require('../models/subcategory.model');
const Category = require('../models/category.model');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/AppError');
const applyApiFeatures = require('../utils/apiFeatures');

 
const createSubCategory = async (req, res, next) => {
    try{
        const {categoryId}  = req.params ;
        const name = req.body.name;
        if(!name || !name.trim()){
            throw new AppError('SubCategory name is required', StatusCodes.BAD_REQUEST);
        }

        const category = await Category.findOne({_id: categoryId , isDeleted: false });
        
        if(!category){
           throw new AppError('Category not found', StatusCodes.BAD_REQUEST)
        }
        const subCategory = await SubCategory.create({name, category: category._id});

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: subCategory
        })
    }catch(error){
        next(error);
    }
}

const getSubCategory = async (req, res, next) => {
    
    try{
        const {id} = req.params;
        const subCategory = await SubCategory.findOne({_id: id, isDeleted: false});
        console.log("subCategory",subCategory)
        if(!subCategory){
            throw new AppError('SubCategory not found', StatusCodes.NOT_FOUND)
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: subCategory
        })
    }catch(error){
        next(error)
    }
}
const getAllSubCategory = async (req, res, next) => {
    
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const sort = req.query.sort == 'desc' ? -1 : 1;
        const search = req.query.search || "";

        const [subCategories, total] = await Promise.all([SubCategory.find({isDeleted: false, name:{$regex: search, $options: 'i'}})
                                .populate('category', 'name')
                                .limit(limit)
                                .skip((page-1)*limit)
                                .sort({name:sort}), 
                                SubCategory.countDocuments({isDeleted: false, name: {$regex: search, $options: 'i'}})]);
                                
        
        res.status(StatusCodes.OK).json({
            success: true,
            limit,
            page,
            total,
            count: subCategories.length,
            data: subCategories
        })
    }catch(error){
        next(error);
    }
}

const deleteSubCategory = async (req, res, next) => {
    try{
        const SubCategoryId = req.params.id;

        const subCategory = await SubCategory.findOneAndUpdate({_id: SubCategoryId, isDeleted:false}, {isDeleted: true}, {new: true});
        
        if(!subCategory){
            throw new AppError(
        'SubCategory not found or already deleted',
        StatusCodes.NOT_FOUND
      );
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "SubCategory deleted successfully"
        })  
    }catch(error){
        next(error);
    }
}

module.exports = {
    createSubCategory,
    getAllSubCategory,
    getSubCategory,
    deleteSubCategory
}