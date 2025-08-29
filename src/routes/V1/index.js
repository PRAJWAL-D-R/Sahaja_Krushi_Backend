const express = require ('express')
const {InfoController} = require ('../../controllers')
const AiroplaneRouter=require('./airoplane-route')
const CityRouter=require('./city-routes')

const router = express.Router();


router.use('/airoplane',AiroplaneRouter);
router.use('/cities',CityRouter);
router.get('/info', InfoController.info);

module.exports = router;