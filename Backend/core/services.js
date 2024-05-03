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
