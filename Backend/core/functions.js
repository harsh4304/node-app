var fs = require('fs');
const path = require('path');

// function loadUtilFunctions() {
//     const functions = {};
//     let modules = {}
//     const modulesPath = path.join(__dirname, '..', 'api');

//     const module_directory = fs.readdirSync(modulesPath);
//     modules = module_directory

//     module_directory.forEach(moduleDir => {
//         const module_path = path.join(modulesPath, moduleDir);

//         const functions_path = path.join(module_path, 'functions');

//         const functions_files = fs.readdirSync(functions_path);

//         functions_files.forEach(file => {
//                 const functions_name = path.basename(file, '.js');
//                 const a = functions_name.split('S')[0];
//                 const functionsModule = require(path.join(functions_path, file));
//                 functions[a] = {
//                     [functions_name]: functionsModule
//                 };
//         });
//     });

//     return functions;
// }

function loadUtilFunctions() {
    const functions = {};

    const modulesPath = path.join(__dirname, '..', 'api');

    const moduleDirectories = fs.readdirSync(modulesPath);

    moduleDirectories.forEach(moduleDir => {
        const modulePath = path.join(modulesPath, moduleDir);

        const functionsPath = path.join(modulePath, 'functions');

        if (fs.existsSync(functionsPath)) {
            const functionFiles = fs.readdirSync(functionsPath);

            functionFiles.forEach(file => {
                const functionName = path.basename(file, '.js');
                const functionModule = require(path.join(functionsPath, file));
                
                // Ensure the module exists in the functions object
                if (!functions[moduleDir]) {
                    functions[moduleDir] = {};
                }

                functions[moduleDir][functionName] = functionModule;
            });
        }
    });

    return functions;
}

module.exports = { loadUtilFunctions }