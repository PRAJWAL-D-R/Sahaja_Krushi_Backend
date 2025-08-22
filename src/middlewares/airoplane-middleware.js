const StatusCodes = require('../utils/status-codes');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber){
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
        success:true,
        message:"Model Number not found in the request",
        data:{},    
        error:{explanation:"Model Number is required"}
        });
    }
    next();
}

module.exports={
    validateCreateRequest  
}