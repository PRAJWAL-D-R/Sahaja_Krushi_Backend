const { StatusCodes } = require('http-status-codes');
const {AiroplaneService} = require ('../services');
const { response } = require('express');

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


module.exports={
    createAiroplane
}