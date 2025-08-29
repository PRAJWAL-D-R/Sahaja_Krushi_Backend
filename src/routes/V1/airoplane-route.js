const express = require('express');

const {AiroplaneController}=require('../../controllers');
const { AiroplaneMiddleware } = require('../../middlewares');


const router = express.Router();
// /api/v1/airoplane
router.post('/',
    AiroplaneMiddleware.validateCreateRequest,
    AiroplaneController.createAiroplane);

router.get('/',
    AiroplaneController.getAiroplanes);

router.get('/:id',
    AiroplaneController.getAiroplanesById);

router.delete('/:id',
    AiroplaneController.destroyAiroplane);

router.patch('/:id',
    AiroplaneMiddleware.validateUpdateRequest,
    AiroplaneController.updateAiroplane);

module.exports= router;