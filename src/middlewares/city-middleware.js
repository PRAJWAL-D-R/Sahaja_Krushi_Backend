const { StatusCodes } = require('http-status-codes');
const {ErrorResponse}= require('../utills/common');
const Apperror = require('../utills/app-error');
function validateCityCreateRequest(req, res, next) {
    if (!req.body.names) {
        ErrorResponse.error = 'Names are required to create a city';
        ErrorResponse.error=new Apperror(
            'Names are required to create a city', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse); 
    }
    next();
}

async function validateCityUpdateRequest(req, res, next) {
    if (!req.body.names) {
        ErrorResponse.error = 'Names are required to update a city';
        return res.status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse); 
    }
    next();
}


module.exports={
    validateCityCreateRequest,
    validateCityUpdateRequest
}