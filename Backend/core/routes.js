const fs = require('fs');
const colors = require('colors');
const path = require('path');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router();
const { verifyToken } = require('../middleware/jwtAuthMiddleware')

var isValid = false;

function loadRoutesJsonData() {

    const routesJson = {};
    var routesFilePath

    const modulesPath = path.join(__dirname, '..', 'api');

    const moduleDirectories = fs.readdirSync(modulesPath);

    moduleDirectories.forEach(moduleDir => {
        const modulePath = path.join(modulesPath, moduleDir);

        routesFilePath = path.join(modulePath, 'routes.json');
        if (fs.existsSync(routesFilePath)) {
            try {
                const routesData = fs.readFileSync(routesFilePath, 'utf8');
                const moduleRoutes = JSON.parse(routesData);

                routesJson[moduleDir] = moduleRoutes
            } catch (err) {
                console.error(`Error reading or parsing routes.json for module ${moduleDir}:`, err);
            }
        } else {
            console.error(`routes.json file not found in module ${moduleDir} directory`);
        }
    });
    return Promise.resolve(routesJson)
}


// function handleRoutes(routes, req, res, next) {
//     Object.values(routes).forEach(moduleRoutes => {
//         moduleRoutes.forEach(route => {
//             if (route.enabled) {
//                 const routePath = route.path;
//                 const method = route.method.toLowerCase(); // Convert method to lowercase
//                 const middleware = []; // Define an array to store middleware

//                 if (!route.public) {
//                     middleware.push(verifyToken); // Add verifyToken middleware if route is not public
//                 }

//                 // Add route handler function
//                 middleware.push((req, res, next) => {
//                     handleAllRequests(req, res, next, routes); // Call handleAllRequests with routes
//                 });

//                 // Dynamically define the route using router[methodname]
//                 router[method](routePath, middleware, (req, res, next) => { });

//                 // Next middleware
//                 next();
//             }
//         });
//     });
// }





function getRoutesFromModules() {
    const routes = [];
    const modulesPath = path.join(__dirname, '..', 'api');
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

function loadController(moduleName, functionName) {
    const controllerFolder = path.join(__dirname, '..', 'api', moduleName, 'controllers');
    const controllerFiles = fs.readdirSync(controllerFolder).filter(file => file.endsWith('.js'));

    for (const file of controllerFiles) {
        const controllerPath = path.join(controllerFolder, file);
        const controller = require(controllerPath);
        if (controller && typeof controller[functionName] === 'function') {
            return controller[functionName];
        }
    }
    return null;
}

function handleAllRequests(req, res, next) {
    const routes = getRoutesFromModules();
    const { url, method } = req;
    const route = routes.find(route => route.path === url && route.method === method);
    if (route) {
        const { action } = route;
        const [moduleName, functionName] = action.split('.');
        const controller = loadController(moduleName, functionName);
        if (controller) {
            if (!route.public) {
                verifyToken(req,res,next)
            }
            else {
                controller(req, res, next);
                return;
            }
        }
    }
    next()
}

function validateRoutes(routes) {
    const requiredKeys = ["path", "method", "action", "public", "pathFromRoot", "enabled"];
    let hasMissingKeys = false;
    let missingRoutes = [];
    // let token = jwt.sign({ jsonArray }, process.env.SECRET_KEY, { expiresIn: '1d' });
    Object.keys(routes).forEach(moduleName => {
        const moduleRoutes = routes[moduleName];


        moduleRoutes.forEach((obj, index) => {
            let missingKeys = [];
            let inValidValues = [];
            let emptyValues = [];

            requiredKeys.forEach(key => {
                if (!(key in obj)) {
                    missingKeys.push(key);
                } else if (!obj[key] && obj[key] !== false) {
                    emptyValues.push(key);
                } else if (key === "method" && (obj[key] != "POST" && obj[key] != "GET" && obj[key] != "PUT" && obj[key] != "PATCH" && obj[key] != "DELETE")) {
                    inValidValues.push(`\n[Error]: Invalid method (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                } else if (key === "pathFromRoot" && obj[key] !== true && obj[key] != false) {
                    inValidValues.push(`\n[Error]: Invalid pathFromRoot (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                } else if (key === "public" && obj[key] !== true && obj[key] != false) {
                    inValidValues.push(`\n[Error]: Invalid public (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                } else if (key === "enabled" && obj[key] !== true && obj[key] != false) {
                    inValidValues.push(`\n[Error]: Invalid enabled (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                } else if (key === "action" && obj[key] === "") {
                    inValidValues.push(`\n[Error]: Invalid action (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                }
                //  else if (key === 'public' && obj[key] === false) {



                //     if (!token) {
                //         inValidValues.push(`\n[Error]: No token provided [API]: ${obj.path}`)
                //     } else {
                //         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                //             if (err) {
                //                 inValidValues.push(`\n[Error]: Invalid token [API]: ${obj.path}`);
                //             }
                //             console.log(obj.path, '---> Token Verified');
                //         });
                //         return;
                //     }
                // }
            });

            if (missingKeys.length > 0 || emptyValues.length > 0 || inValidValues.length > 0) {
                const errorMessages = [];

                if (missingKeys.length > 0) {
                    errorMessages.push(`\n[Error]: Missing key ${missingKeys} [Module]: routes.json [API]: ${obj.path}`.red);
                }
                if (emptyValues.length > 0) {
                    errorMessages.push(`\n[Error]: Missing Values for key ${emptyValues.join(', ')} [Module]: routes.json [API]: ${obj.path}`.red);
                }
                if (inValidValues.length > 0) {
                    errorMessages.push(`${inValidValues}`.red);
                }
                missingRoutes.push({ index: index + 1, messages: errorMessages });
                hasMissingKeys = true;
            }
        });
    })

    if (hasMissingKeys) {
        colors.enable();
        console.log('[Warning]: Some route objects are missing required keys or their values.'.yellow);
        missingRoutes.forEach(route => {
            route.messages.forEach(message => console.log(message));
        });
        return false;
    } else {
        console.log(`All correct.. you can access routes`);
        return true;
    }
}


loadRoutesJsonData()
    .then(routes => {
        isValid = validateRoutes(routes);
        if (isValid) {
            isValidCallback(true);
            router.use((req, res, next) => {
                handleAllRequests(req,res,next)
            });
            // router.all('*', );
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });


let isValidCallback;

function setValidCallback(callback) {
    isValidCallback = callback;
}



module.exports = { router, setValidCallback };
