const express = require ('express')
const NewsRouter=require('./news-routes')
const authRoutes = require('./auth-routes')
const farmerRoutes = require('./farmer-routes')
const queryRoutes = require('./query-routes')

const router = express.Router();

router.use('/news',NewsRouter);
router.use('/auth', authRoutes);
router.use('/farmers', farmerRoutes);
router.use('/queries', queryRoutes);

module.exports = router;