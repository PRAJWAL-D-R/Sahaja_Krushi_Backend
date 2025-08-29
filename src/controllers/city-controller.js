const { StatusCodes } = require('http-status-codes');
const {CityService} = require ('../services');
const { response } = require('express');
const { SuccessResponse, ErrorResponse } = require('../utills/common');

async function createCity(req, res){
    try{
        const city=await CityService.createCity({
            names:req.body.names
        });
        SuccessResponse.data=city;
        return res.status(StatusCodes.CREATED)
                    .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error;
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    } 
}

async function getCity(req, res){
    try{
        const cities=await CityService.getAllCity();
        SuccessResponse.data=cities;
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error;
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}
async function getCityById(req, res){
    try{
        const city=await CityService.getCityById(req.params.id);
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error;
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}

async function destroyCity(req, res){
    try{
        const response=await CityService.destroyCity(req.params.id);
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)
    }
    catch(error){
        ErrorResponse.error=error;
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}
async function updateCity(req, res){
    try{

        const city=await CityService.updateCity(req.params.id,{
            names:req.body.names
        });
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK)
                    .json(SuccessResponse)  
    }
    catch(error){
        ErrorResponse.error=error;
        return res 
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}

module.exports = {
    createCity,
    getCity,
    getCityById,
    destroyCity,
    updateCity
}