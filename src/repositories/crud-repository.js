const { where } = require("sequelize");
const logger = require("../config/logger-config");
const Apperror = require("../utills/app-error");
const statusCodes = require("http-status-codes");

class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            const response = await this.model.create(data);
            return response; 
        }catch(error){
            logger.error('Something went wrong in crud repo : create');
            throw error;

        }
    }
     async destroy(data){
        try{
            const response = await this.model.destroy({
                where :{
                    id:data
                }
            });
            if(!response){
                throw new Apperror('No data found',statusCodes.NOT_FOUND);
            }
            return response; 
        }catch(error){
            logger.error('Something went wrong in crud repo : create');
            throw error;

        }
    }
     async get(data){
        try{
            const response = await this.model.findByPk(data);
            if(!response){
                throw new Apperror('No data found',statusCodes.NOT_FOUND);
            }
            return response;
           
        }catch(error){
            logger.error('Something went wrong in crud repo : create');
            throw error;

        }
    }
    async getAll(data){
        try{
            const response = await this.model.findAll();
            return response; 
        }catch(error){
            logger.error('Something went wrong in crud repo : create');
            throw error;

        }
    }
     async update(id, data){
        try{
            const response = await this.model.update(data,{
                where:{
                    id : id
                }
            });
            return response; 
        }catch(error){
            logger.error('Something went wrong in crud repo : create');
            throw error;

        }
    }
    
}

module.exports = CrudRepository;