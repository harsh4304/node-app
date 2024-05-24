'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../db/sequelize/config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const modelsDirectory = path.join(__dirname, '/../db/sequelize/models');

fs
    .readdirSync(modelsDirectory)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(modelsDirectory, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
        if (!db.models) db.models = {};
        db.models[model.name] = model;



    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function getMongoModels() {
    const mongo_models = { models: {} };
    const modelsPath = path.join(__dirname, '..', 'db', 'mongo', 'models');

    try {
        const modelFiles = fs.readdirSync(modelsPath);

        modelFiles.forEach(file => {
            const modelName = path.basename(file, '.js');
            const modelModule = require(path.join(modelsPath, file));
            mongo_models.models = modelModule;
        });
    } catch (err) {
        console.warn('Error reading models directory:', err);
    }

    return mongo_models;
}


module.exports = { db, getMongoModels };

// const path = require('path');
// const fs = require('fs');

// function getModels() {
//     const models = {}
//     const modelsPath = path.join(__dirname, '..', 'db', 'models');

//     try {
//         if (fs.existsSync(modelsPath)) {
//             const modelsFiles = fs.readdirSync(modelsPath);
//             modelsFiles.map(file => path.basename(file, '.js'));
//             modelsFiles.forEach(file => {
//                 const serviceName = path.basename(file, '.js');
//                 const serviceModule = require(path.join(modelsPath, file));
//                 models[serviceName] = serviceModule
//             });
//         } else {
//             console.warn('Models folder not found.');
//         }
//     } catch (error) {
//         console.warn('Error loading models:', error);
//     }
//     return models;
// }

// module.exports = {
//     getModels
// }