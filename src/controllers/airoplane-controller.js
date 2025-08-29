const { StatusCodes } = require('http-status-codes');
const {AiroplaneService} = require ('../services');
const { response } = require('express');
const { SuccessResponse, ErrorResponse } = require('../utills/common');

async function createAiroplane(req, res){
    try{
        const airoplane=await AiroplaneService.createAiroplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        return res.status(StatusCodes.CREATED)
                    .json({
                        success:true,
                        message:"Successfully create an Airoplane",
                        data:airoplane,
                        error:{}
                    })
    }catch(error){
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                     success:false,
                        message:"Something went to wrong while creating a airoplane",
                        data:{},
                        error:error
                })
    }
}

async function getAiroplanes(req,res){
    try{    
        const airoplane=await AiroplaneService.getAiroplane();
       SuccessResponse.data=airoplane;
       return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAiroplanesById(req,res){
    try{    
        const airoplane=await AiroplaneService.getAiroplaneID(req.params.id);
       SuccessResponse.data=airoplane;
       return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function destroyAiroplane(req,res){
    try{    
        const airoplane=await AiroplaneService.destroyAiroplane(req.params.id);
       SuccessResponse.data=airoplane;
       return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }       
}

async function updateAiroplane(req,res){
    try{
        const airoplane=await AiroplaneService.updateAiroplane(req.params.id,{
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        return res.status(StatusCodes.OK)
                    .json({
                        success:true,
                        message:"Successfully update an Airoplane",
                        data:airoplane,
                        error:{}
                    })
    }catch(error){
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                     success:false,
                        message:"Something went to wrong while updating a airoplane",
                        data:{},
                        error:error
                })
    }
}

module.exports={
    createAiroplane,
    getAiroplanes,
    getAiroplanesById,
    destroyAiroplane,
    updateAiroplane
}