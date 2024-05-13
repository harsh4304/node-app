const fs = require('fs');
const path = require('path');
const readline = require('readline');

function createModule(name) {
    if (name === undefined) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Please enter module name : `, (answer) => {
            rl.close();
            if (answer) {
                if (!fs.existsSync(answer)) {
                    const moduleName = answer;
                    const modulePath = path.join(__dirname, '..', 'api', moduleName);

                    fs.mkdirSync(modulePath);

                    fs.createWriteStream(path.join(modulePath, 'routes.json'));
                    fs.mkdirSync(path.join(modulePath, 'services'));
                    fs.mkdirSync(path.join(modulePath, 'functions'));
                    fs.mkdirSync(path.join(modulePath, 'controllers'));
                    fs.mkdirSync(path.join(modulePath, 'middlewares'));
                    console.log(`Module '${moduleName}' created successfully..green`);

                } else {
                    console.log(`Module '${answer}' already exists..yellow`);
                }
            } else {
                console.log(`Module creation cancelled due to improper name..yellow`);
            }
        });
    }
    else {
        if (!fs.existsSync(name)) {

            const moduleName = name;
            const modulePath = path.join(__dirname, '..', 'api', moduleName);

            fs.mkdirSync(modulePath);

            fs.createWriteStream(path.join(modulePath, 'routes.json'));
            fs.mkdirSync(path.join(modulePath, 'services'));
            fs.mkdirSync(path.join(modulePath, 'functions'));
            fs.mkdirSync(path.join(modulePath, 'controllers'));
            fs.mkdirSync(path.join(modulePath, 'middlewares'));
            console.log(`Module '${moduleName}' created successfully..green`);
        } else {
            console.log(`Module '${moduleName}' already exists..yellow`);
        }

    }
}

module.exports = { createModule }