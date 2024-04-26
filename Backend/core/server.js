var http = require('http');
var fs = require('fs');
const path = require('path');
var colors = require('colors')
const { adminSignup, adminLogin } = require('../api/module1/controllers/authController');


// Function to extract functions from a service file
function loadModulesAndServices() {
    const services = {};
    let modules = {}
    const modulesPath = path.join(__dirname, '..', 'api');

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
                    [service_name]:serviceModule
                };
            }
        });
    });

    return services;
}

global.framework = {
    services: loadModulesAndServices()
};


function createServer() {
    http.createServer(function (req, res) {
        
        if (req.url == '/signup') {
            adminSignup(req, res);
        } else if (req.url == '/login') {
            adminLogin(req, res);
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
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });


