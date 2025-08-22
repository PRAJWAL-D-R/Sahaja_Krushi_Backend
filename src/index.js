const express = require ('express')
const {serverConfig, logger} = require ('./config')
const apiRoutes = require ('./routes')
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies

app.use('/api',apiRoutes);

app.listen(serverConfig.PORT, ()=>{
    console.log(`Connected to PORT : ${serverConfig.PORT} Successfully`);
    //logger.info(`Server running on PORT: ${serverConfig.PORT}`);
})