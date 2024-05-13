const path = require('path');
const fs = require('fs');

function getModels() {
    const models = {}
    const modelsPath = path.join(__dirname, '..', 'db', 'models');

    try {
        if (fs.existsSync(modelsPath)) {
            const modelsFiles = fs.readdirSync(modelsPath);
            modelsFiles.map(file => path.basename(file, '.js'));
            modelsFiles.forEach(file => {
                const serviceName = path.basename(file, '.js');
                const serviceModule = require(path.join(modelsPath, file));
                models[serviceName] = serviceModule
            });
        } else {
            console.warn('Models folder not found.');
        }
    } catch (error) {
        console.warn('Error loading models:', error);
    }
    return models;
}

module.exports = {
    getModels
}