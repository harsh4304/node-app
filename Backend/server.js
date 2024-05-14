const express = require('express');
const app = express();
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { router, initializeServer } = require('./core/routes');
const { db } = require('./core/models');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    db: db
}

global.framework = framework;

function createServer() {

    app.use(router)
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });

}

function startServer() {
    initializeServer(createServer)
    // setValidCallback((isValid) => {
    //     if (isValid) {
    //         framework.functions.module1.fileUtils.fileFunction();

    //         checkMigrations((isMigrationsUpToDate) => {
    //             if (isMigrationsUpToDate) {
    //                 createServer();
    //             } else {
    //                 createServer()
    //             }
    //         });
    //     } else {
    //         console.error("Invalid routes. Server cannot start.");
    //     }
    // });
}

module.exports = { startServer }

