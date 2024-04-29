var fs = require('fs');
const path = require('path');

function loadControllersInApi() {
    const controllers = {};
    let modules = {}
    const modulesPath = path.join(__dirname, '..', 'api');

    const module_directory = fs.readdirSync(modulesPath);
    modules = module_directory

    module_directory.forEach(moduleDir => {
        const module_path = path.join(modulesPath, moduleDir);

        const controllers_path = path.join(module_path, 'controllers');

        const controllers_files = fs.readdirSync(controllers_path);

        controllers_files.forEach(file => {
            const controllersname = path.basename(file, '.js');
            const a = controllersname.split('S')[0];
            const controllersodule = require(path.join(controllers_path, file));
            controllers[controllersname] = controllersodule;
        });
    });

    return controllers;
}

module.exports = {
    loadControllersInApi
}