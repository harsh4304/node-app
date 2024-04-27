var http = require('http');
var fs = require('fs');
const path = require('path');
var colors = require('colors')

function loadServicesInApi() {
    const services = {};
    let modules = {}
    const modulesPath = path.join(__dirname, '.', 'api');

    // Read the contents of the modules directory
    const module_directory = fs.readdirSync(modulesPath);
    modules = module_directory



    // Iterate over each module directory
    module_directory.forEach(moduleDir => {
        const module_path = path.join(modulesPath, moduleDir);

        // Check if it's a directory
        // if (moduleStat.isDirectory()) {
        const services_path = path.join(module_path, 'services');

        const services_files = fs.readdirSync(services_path);

        // Iterate over each file in the services directory
        services_files.forEach(file => {
            // Assuming services file starts with 'module'
            if (file.startsWith('module')) {
                const service_name = path.basename(file, '.js');
                const a = service_name.split('S')[0];
                const serviceModule = require(path.join(services_path, file));
                services[a] = {
                    [service_name]: serviceModule
                };
            }
        });
    });

    return services;
}

// function loadServicesInCore() {
//     const services = {};
//     const services_path = path.join(__dirname, '.', 'core', 'services');

//     const servicesDirectories = fs.readdirSync(services_path);

//     servicesDirectories.forEach(file => {


//         const services_file_name = path.basename(file, '.js');

//         const services_module = require(path.join(services_path, file));

//         services[services_file_name] = services_module

//     });
//     return services;
// }

function loadUtilFunctions() {
    const functions = {};
    const functions_path = path.join(__dirname, '.', 'core', 'functions');

    const functionsDirectories = fs.readdirSync(functions_path);

    functionsDirectories.forEach(file => {


        const functions_file_name = path.basename(file, '.js');

        const functions_module = require(path.join(functions_path, file));

        functions[functions_file_name] = functions_module

    });
    return functions;
}

function loadCronFunctions() {
    const crons = {};
    const crons_path = path.join(__dirname, '.', 'core', 'crons');

    const cronsDirectories = fs.readdirSync(crons_path);

    cronsDirectories.forEach(file => {


        const crons_file_name = path.basename(file, '.js');

        const crons_module = require(path.join(crons_path, file));

        crons[crons_file_name] = crons_module

    });
    return crons;
}

function loadControllersInApi() {
    const controllers = {};
    let modules = {}
    const modulesPath = path.join(__dirname, '.', 'api');

    // Read the contents of the modules directory
    const module_directory = fs.readdirSync(modulesPath);
    modules = module_directory



    // Iterate over each module directory
    module_directory.forEach(moduleDir => {
        const module_path = path.join(modulesPath, moduleDir);

        // Check if it's a directory
        // if (moduleStat.isDirectory()) {
        const controllers_path = path.join(module_path, 'controllers');

        const controllers_files = fs.readdirSync(controllers_path);

        // Iterate over each file in the services directory
        controllers_files.forEach(file => {
            // Assuming services file starts with 'module'
            // if (file.startsWith('module')) {
            const controllersname = path.basename(file, '.js');
            const a = controllersname.split('S')[0];
            const controllersodule = require(path.join(controllers_path, file));
            controllers[controllersname] = controllersodule;
            // }
        });
    });

    return controllers;
}

global.framework = {
    services: loadServicesInApi(),
    functions: loadUtilFunctions(),
    crons: loadCronFunctions(),
    controllers: loadControllersInApi()
};



function createServer() {
    http.createServer(function (req, res) {
        if (req.url == '/signup') {
            framework.controllers.authController.adminSignup(req,res);
        } else if (req.url == '/login') {
            framework.controllers.authController.adminLogin(req,res);
        }

    }).listen(8080, () => {
        console.log('Server is running on port 8080');
    });
}

function loadRoutesData() {
    return new Promise((resolve, reject) => {
        fs.readFile('./api/module1/routes.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

loadRoutesData()
    .then(routes => {
        try {
            const jsonArray = routes;
            let hasMissingKeys = false;
            let missingRoutes = [];
            const requiredKeys = ["path", "method", "action", "public", "pathFromRoot", "enabled"];

            jsonArray.forEach((obj, index) => {
                let missingKeys = [];
                let inValidValues = [];
                let emptyValues = [];
                requiredKeys.forEach(key => {
                    if (!(key in obj)) {
                        missingKeys.push(key);
                    }
                    else if (!obj[key] && obj[key] !== false) {
                        emptyValues.push(key);
                    }
                    else if (key === "method" && (obj[key] != "POST" && obj[key] != "GET" && obj[key] != "PUT" && obj[key] != "PATCH" && obj[key] != "DELETE")) {
                        inValidValues.push(`\n[Error]: Invalid method (value) Configuration [Module]: routes.json [API]: ${obj.path}`);

                    }
                    else if (key === "pathFromRoot" && obj[key] !== true && obj[key] != false) {
                        inValidValues.push(`\n[Error]: Invalid pathFromRoot (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                    }
                    else if (key === "public" && obj[key] !== true && obj[key] != false) {
                        inValidValues.push(`\n[Error]: Invalid public (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                    }
                    else if (key === "enabled" && obj[key] !== true && obj[key] != false) {
                        inValidValues.push(`\n[Error]: Invalid enabled (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                    }
                    else if (key === "action" && obj[key] === "") {
                        inValidValues.push(`\n[Error]: Invalid action (value) Configuration [Module]: routes.json [API]: ${obj.path}`);
                    }
                });

                if (missingKeys.length > 0 || emptyValues.length > 0 || inValidValues.length > 0) {
                    const errorMessages = [];
                    colors.enable()
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
            if (hasMissingKeys) {
                colors.enable()
                console.log('[Warning]: Some route objects are missing required keys or their values.'.yellow);
                missingRoutes.forEach(route => {
                    route.messages.forEach(message => console.log(message));

                });
            } else {
                console.log(`All correct.. you can access routes`);
                createServer();
                framework.services.module1.module1Service.myService1();
                framework.services.module2.module2Service.myService2();
        
                framework.functions.fileUtils.fileFunction();
                framework.functions.mathUtils.mathFunction();
        
                framework.crons.cron1.cron1Function();
                framework.crons.cron2.cron2Function();



            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });


module.exports.framework = global.framework;