const { StatusCodes } = require('http-status-codes');
const {ErrorResponse}= require('../utills/common');
function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber){
        ErrorResponse.success = false;
        ErrorResponse.message = "Model Number not found in the request";
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest  
}