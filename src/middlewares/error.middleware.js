const { statusCode} = require('http-status-codes');

module.exports = (err, req, res, next) => {
    console.log("Error", err);

    const statusCode = err.statusCode || statusCode.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong. Please try again later.';

    res.status(statusCode).json({sucess: false, message});
    
}
