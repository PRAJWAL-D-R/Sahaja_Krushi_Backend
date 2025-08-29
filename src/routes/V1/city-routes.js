const express = require('express');

const {CityController}=require('../../controllers');
const {CityMiddleware}=require('../../middlewares')
const router = express.Router();

// /api/v1/cities
router.post('/',
    CityMiddleware.validateCityCreateRequest,
    CityController.createCity);
router.get('/',CityController.getCity);
router.get('/:id',CityController.getCityById);
router.delete('/:id',CityController.destroyCity);
router.put('/:id',
    CityMiddleware.validateCityUpdateRequest,
    CityController.updateCity);

    
module.exports= router;