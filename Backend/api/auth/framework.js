const module1Service = require('./services/module1Service');

global.framework = {
    services: {
        module1: {
            module1Service: module1Service,
        }
    }
};


module.exports = global.framework;
