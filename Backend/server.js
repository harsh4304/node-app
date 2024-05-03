const express = require('express');
const app = express();
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { router, setValidCallback } = require('./core/routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
}

global.framework = framework;

function createServer() {
    app.use(router)
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
    
}
setValidCallback((isValid) => {
    if (isValid) {
        framework.functions.module1.fileUtils.fileFunction();
        createServer();
    } else {
        console.error("Invalid routes. Server cannot start.");
    }
});


