const mongoose = require('mongoose');
const Category = require('./category.model');

const subCategorySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    isDeleted : {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('SubCategory', subCategorySchema);