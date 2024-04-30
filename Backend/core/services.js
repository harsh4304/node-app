// var fs = require('fs');
// const path = require('path');

// function loadServicesInApi() {
//     const services = {};
//     let modules = {}
//     const modulesPath = path.join(__dirname, '..', 'api');

//     const module_directory = fs.readdirSync(modulesPath);
//     modules = module_directory

//     module_directory.forEach(moduleDir => {
//         const module_path = path.join(modulesPath, moduleDir);

//         const services_path = path.join(module_path, 'services');

//         const services_files = fs.readdirSync(services_path);

//         services_files.forEach(file => {
//             if (file.startsWith('module')) {
//                 const service_name = path.basename(file, '.js');
//                 const a = service_name.split('S')[0];
//                 const serviceModule = require(path.join(services_path, file));
//                 services[a] = {
//                     [service_name]: serviceModule
//                 };
//             }
//         });
//     });

//     return services;
// }

// module.exports = {
//     loadServicesInApi
// }


var fs = require('fs');
const path = require('path');

function loadServicesInApi() {
    const services = {};

    const modulesPath = path.join(__dirname, '..', 'api');

    const moduleDirectories = fs.readdirSync(modulesPath);

    moduleDirectories.forEach(moduleDir => {
        const modulePath = path.join(modulesPath, moduleDir);

        const servicesPath = path.join(modulePath, 'services');

        try {

            if (fs.existsSync(servicesPath)) {
                const functionFiles = fs.readdirSync(servicesPath);

                functionFiles.forEach(file => {
                    const servicesName = path.basename(file, '.js');
                    const servicesModule = require(path.join(servicesPath, file));

                    if (!services[moduleDir]) {
                        services[moduleDir] = {};
                    }

                    services[moduleDir][servicesName] = servicesModule;
                });
            }
        } catch (error) {
            console.warn(`Warning: loading functions for [Module]: ${moduleDir}:`, error);
        }
    });


    return services;
}

module.exports = {
    loadServicesInApi
}
