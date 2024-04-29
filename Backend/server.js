var http = require('http');
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { loadControllersInApi } = require('./core/controllers')
const { loadRoutesData, validateRoutes } = require('./core/routes')

global.framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    controllers: loadControllersInApi()
};

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

loadRoutesData()
    .then(routes => {
        const isValid = validateRoutes(routes);
        if (isValid) {
            createServer();
            framework.services.module1.module1Service.myService1();
            framework.services.module2.module2Service.myService2();
            framework.functions.fileUtils.fileFunction();
            framework.functions.mathUtils.mathFunction();
            // framework.crons.cron1.cron1Function();
            // framework.crons.cron2.cron2Function();
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });

module.exports.framework = global.framework;