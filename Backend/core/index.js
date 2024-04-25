var http = require('http');
var fs = require('fs');
var colors = require('colors')
const { adminSignup, adminLogin } = require('../api/auth/controllers/authController');
require('../api/auth/framework');

// global.framework = fW;


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
        fs.readFile('./api/auth/routes.json', (err, data) => {
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
                framework.services.module1.module1Service.myService();
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    })
    .catch(error => {
        console.error("Error reading or validating routes:", error);
    });
