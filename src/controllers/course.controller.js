const Course = require("../models/course.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const applyApiFeatures = require('../utils/apiFeatures');

const createCourse = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      description,
      categories = [],
      subCategories = [],
    } = req.body;

    if (!title || !categories.length || !subCategories.length) {
      throw new AppError(
        "Title, categories and subCategories are required",
        StatusCodes.BAD_REQUEST,
      );
    }

    const validCategories = await Category.find({
      _id: { $in: categories },
      isDeleted: false,
    }).session(session);

    if (validCategories.length !== categories.length) {
      throw new AppError(
        "One or more Categories are invalid",
        StatusCodes.BAD_REQUEST,
      );
    }

    const validSubCategories = await SubCategory.find({
      _id: { $in: subCategories },
      isDeleted: false,
    }).session(session);

    if (validSubCategories.length !== subCategories.length) {
      throw new AppError(
        "One or more SubCategories are invalid",
        StatusCodes.BAD_REQUEST,
      );
    }

    const categoryIds = categories.map((id) => id.toString());

    const invalidSubCategory = validSubCategories.find(
      (sub) => !categoryIds.includes(sub.category.toString()),
    );

    if (invalidSubCategory) {
      throw new Error(
        "Some SubCategories do not belong to selected Categories",
      );
    }

    const [course] = await Course.create(
      [
        {
          title,
          description,
          categories,
          subCategories,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: course,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "asc";
    const sortOrder = sort == "asc" ? 1 : sort == "desc" ? -1 : 1;
    const page = Number(req.query.page) || 1;

    const [courses, total] =
      await Promise.all([
        Course.find({
          isDeleted: false,
          title: { $regex: search, $options: "i" },
        })
          .populate("categories", "name")
          .populate("subCategories", "name")
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .sort({ name: sortOrder }),
        Course.countDocuments({
          isDeleted: false,
          title: { $regex: search, $options: "i" },
        })
      ]);
      
    res.status(StatusCodes.OK).json({
      success: true,
      page,
      limit,
      sort,
      search,
      total,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const {id} = req.params;
    const course = await Course.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!course) {
      throw new AppError(
        "Course not found or already deleted",
        StatusCodes.NOT_FOUND,
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { createCourse, getCourse, deleteCourse };
