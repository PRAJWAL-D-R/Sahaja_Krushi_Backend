const CrudRepository =require ('./crud-repository');
const {Airoplane} = require('../models')

class AiroplaneRepository extends CrudRepository{
    constructor(){
        super(Airoplane);
    }
    
}

module.exports=AiroplaneRepository;