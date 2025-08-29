const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const Apperror = require('../utills/app-error');
const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError') {
            throw new Apperror('City already exists', StatusCodes.BAD_REQUEST);
        }
        throw new Apperror('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCity(){
    try{
        const cities=await cityRepository.getAll();
        return cities;
    }catch(error){
        throw new Apperror('Cannot fetch data of cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCityById(id){
    try{  
        const city=await cityRepository.get(id);
        return city;
    }catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){    
            throw new Apperror('The city you requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new Apperror('Cannot fetch data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try{
        const city=await cityRepository.destroy(id);
        return city;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){    
            throw new Apperror('The city you to delete requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new Apperror('Cannot delete data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try{
        const city=await cityRepository.update(id,data);
        return city;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){    
            throw new Apperror('The city you to update requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new Apperror('Cannot update data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createCity,
    getAllCity,
    getCityById,
    destroyCity,
    updateCity
}
