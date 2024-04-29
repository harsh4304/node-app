const fs = require('fs');
const jwt = require('jsonwebtoken');
const colors = require('colors');
require('dotenv').config();

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

function validateRoutes(routes) {
    const jsonArray = routes;
    const requiredKeys = ["path", "method", "action", "public", "pathFromRoot", "enabled"];
    let hasMissingKeys = false;
    let missingRoutes = [];
    let token = jwt.sign({ jsonArray }, process.env.SECRET_KEY, { expiresIn: '1d' });

    jsonArray.forEach((obj, index) => {
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
            } else if (key === 'public' && obj[key] === false) {
                if (!token) {
                    inValidValues.push(`\n[Error]: No token provided [API]: ${obj.path}`)
                } else {
                    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                        if (err) {
                            inValidValues.push(`\n[Error]: Invalid token [API]: ${obj.path}`);
                        }
                        console.log(obj.path, '---> Token Verified');
                    });
                    return;
                }
            }
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

module.exports = { loadRoutesData, validateRoutes };
