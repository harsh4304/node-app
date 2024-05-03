var fs = require('fs');
const path = require('path');

function loadUtilFunctions() {
    const functions = {};

    const modulesPath = path.join(__dirname, '..', 'api');

    const moduleDirectories = fs.readdirSync(modulesPath);

    moduleDirectories.forEach(moduleDir => {
        const modulePath = path.join(modulesPath, moduleDir);

        const functionsPath = path.join(modulePath, 'functions');

        try {

            if (fs.existsSync(functionsPath)) {
                const functionFiles = fs.readdirSync(functionsPath);

                functionFiles.forEach(file => {
                    const functionName = path.basename(file, '.js');
                    const functionModule = require(path.join(functionsPath, file));

                    if (!functions[moduleDir]) {
                        functions[moduleDir] = {};
                    }

                    functions[moduleDir][functionName] = functionModule;
                });
            }
        } catch (error) {
            console.warn(`Warning: loading functions for [Module]: ${moduleDir}:`, error);
        }
    });


    return functions;
}

module.exports = { loadUtilFunctions }