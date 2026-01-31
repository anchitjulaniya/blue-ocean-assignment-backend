const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const {StatusCodes} = require('http-status-codes');


 const validateIdMiddleware = (req, res, next) => {
    const {id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
       return next(new AppError('Invalid ID format', StatusCodes.BAD_REQUEST))
    };

    next();
}

module.exports = validateIdMiddleware;