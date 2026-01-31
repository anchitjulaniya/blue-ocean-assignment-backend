const mongoose = require('mongoose');
const Category = require('./category.model');
const SubCategory = require('./subcategory.model');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        default: ""
    },
    categories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    }],
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: SubCategory,
        required: true
    }],
    isDeleted : {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


module.exports = mongoose.model('Course', courseSchema);