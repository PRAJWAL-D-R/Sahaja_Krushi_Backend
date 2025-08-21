const express = require ('express')
const {serverConfig, logger} = require ('./config')
const apiRoutes = require ('./routes')
const app = express();

app.use('/api',apiRoutes);

app.listen(serverConfig.PORT, ()=>{
    console.log(`Connected to PORT : ${serverConfig.PORT} Successfully`);
    //logger.info(`Server running on PORT: ${serverConfig.PORT}`);
})