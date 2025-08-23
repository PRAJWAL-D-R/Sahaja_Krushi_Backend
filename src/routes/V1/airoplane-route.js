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


module.exports= router;