var fs = require('fs');
const path = require('path');

function loadUtilFunctions() {
    const functions = {};
    const functions_path = path.join(__dirname, '..', 'functions');

    const functionsDirectories = fs.readdirSync(functions_path);

    functionsDirectories.forEach(file => {


        const functions_file_name = path.basename(file, '.js');
        console.log(functions_file_name);

        const functions_module = require(path.join(functions_path, file));

        functions[functions_file_name] = functions_module;
        

    });
    return functions;
}

module.exports = { loadUtilFunctions }