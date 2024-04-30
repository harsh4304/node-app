var http = require('http');
const { loadUtilFunctions } = require('./core/functions');
const { loadServicesInApi } = require('./core/services')
const { loadCronFunctions } = require('./core/crons')
const { validateRoutes, loadControllersInApi, loadRoutesJson } = require('./core/routes');
const path = require('path');
const fs = require('fs')

const framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    // controllers: loadControllersInApi()
}

global.framework = framework;


// function createServer() {
//     http.createServer(function (req, res) {
//         if (req.url == '/signup') {
//             framework.controllers.authController.adminSignup(req, res);
//         } else if (req.url == '/login') {
//             framework.controllers.authController.adminLogin(req, res);
//         }
//     }).listen(8080, () => {
//         console.log('Server is running on port 8080');
//     });
// }


function createServer() {
    http.createServer(function (req, res) {
        const routes = loadRoutesFromModules();

        for (const route of routes) {
            if (req.url === route.path) {
                const [moduleName, functionName] = route.action.split('.');
                const controllerFolder = path.join(__dirname, 'api', moduleName, 'controllers');
                const controllerFiles = fs.readdirSync(controllerFolder).filter(file => file.endsWith('.js'));

                for (const file of controllerFiles) {
                    const controllerPath = path.join(controllerFolder, file);
                    const controller = require(controllerPath);
                    if (controller && typeof controller[functionName] === 'function') {
                        controller[functionName](req, res);
                        return;
                    }
                }
            }
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not Found');
    }).listen(8080, () => {
        console.log('Server is running on port 8080');
    });
}

function loadRoutesFromModules() {
    const routes = [];
    const modulesPath = path.join(__dirname, 'api');

    const moduleDirectories = fs.readdirSync(modulesPath);

    moduleDirectories.forEach(moduleDir => {
        const routesFilePath = path.join(modulesPath, moduleDir, 'routes.json');
        try {
            const routesData = fs.readFileSync(routesFilePath, 'utf8');
            const moduleRoutes = JSON.parse(routesData);
            routes.push(...moduleRoutes.map(route => ({ ...route, module: moduleDir })));
        } catch (err) {
            console.error(`Error loading routes from module ${moduleDir}:`, err);
        }
    });

    return routes;
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

