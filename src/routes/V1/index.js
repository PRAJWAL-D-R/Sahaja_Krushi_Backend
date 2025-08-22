const express = require ('express')
const {InfoController} = require ('../../controllers')
const AiroplaneRouter=require('./airoplane-route')


const router = express.Router();


router.use('/airoplane',AiroplaneRouter)
router.get('/info', InfoController.info);

module.exports = router;