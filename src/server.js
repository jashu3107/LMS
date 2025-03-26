const express = require('express');
const { PORT } = require('./config');
const logger = require('./helpers/logger');
const config = require('./config/index.js');
const app = express();
app.use(express.json());

app.use('/api/v1',require('./routes/mainRoute'));



app.listen(config.WEB_PORT, () => {
    logger.info(`SERVER STARTED AT PORT - ${config.WEB_PORT}`)
    console.log(`Server running at ${config.WEB_PORT}`)
})