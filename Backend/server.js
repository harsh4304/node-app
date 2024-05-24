const express = require('express');
const app = express();
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { router, initializeServer } = require('./core/routes');
const { db } = require('./core/models');
const { getMongoModels} = require('./core/models')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    sequelize: db,
    mongo: getMongoModels()
}

global.framework = framework;

function createServer() {
    console.log('==> sequelize models: ',framework.sequelize.models.Employee);
    console.log('==> mongo models: ',framework.mongo.models.user);

    app.use(router)
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });

}

function startServer() {
    initializeServer(createServer)
}

module.exports = { startServer }

