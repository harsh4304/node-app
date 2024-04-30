var http = require('http');
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { validateRoutes, loadControllersInApi, loadRoutesJson } = require('./core/routes')

const framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    controllers: loadControllersInApi()
}

global.framework = framework;


function createServer() {
    http.createServer(function (req, res) {
        if (req.url == '/signup') {
            framework.controllers.authController.adminSignup(req, res);
        } else if (req.url == '/login') {
            framework.controllers.authController.adminLogin(req, res);
        }
    }).listen(8080, () => {
        console.log('Server is running on port 8080');
    });
}

loadRoutesJson()
    .then(routes => {
        const isValid = validateRoutes(routes);
        if (isValid) {
            createServer()
            framework.functions.module1.fileUtils.fileFunction();
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });

