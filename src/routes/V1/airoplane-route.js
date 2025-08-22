const express = require('express');

const {AiroplaneController}=require('../../controllers');


const router = express.Router();
// /api/v1/airoplane
router.post('/',AiroplaneController.createAiroplane);

module.exports= router;