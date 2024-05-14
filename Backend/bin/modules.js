const fs = require('fs');
const path = require('path');
const readline = require('readline');
const colors = require('colors')
colors.enable()
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
                    fs.appendFile(path.join(modulePath, 'services', moduleName + 'Service.js'),
                        `function myService() {
                        console.log('myService function');
                        console.log('');
                    }
                    module.exports = {
                        myService
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Service file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'functions'));
                    fs.appendFile(path.join(modulePath, 'functions', moduleName + 'Functions.js'),
                        `function myFunction() {
                        console.log('myFunction function');
                        console.log('');
                    }
                    module.exports = {
                        myFunction
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Functions file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'controllers'));
                    fs.appendFile(path.join(modulePath, 'controllers', moduleName + 'Controllers.js'),
                        `function myController() {
                        console.log('myController function');
                        console.log('');
                    }
                    module.exports = {
                        myController
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Controllers file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'middlewares'));
                    fs.appendFile(path.join(modulePath, 'middlewares', moduleName + 'Middlewares.js'),
                        `function myMiddleware() {
                        console.log('myMiddleware function');
                        console.log('');
                    }
                    module.exports = {
                        myMiddleware
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Middlewares file for '${moduleName}' created successfully.`.green);
                    });

                    console.log(`Module '${moduleName}' created successfully.`.green);

                } else {
                    console.log(`Module '${answer}' already exists.`.yellow);
                }
            } else {
                console.log(`Module creation cancelled due to improper name.`.yellow);
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
                    fs.appendFile(path.join(modulePath, 'services', moduleName + 'Service.js'),
                        `function myService() {
                        console.log('myService function');
                        console.log('');
                    }
                    module.exports = {
                        myService
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Service file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'functions'));
                    fs.appendFile(path.join(modulePath, 'functions', moduleName + 'Functions.js'),
                        `function myFunction() {
                        console.log('myFunction function');
                        console.log('');
                    }
                    module.exports = {
                        myFunction
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Functions file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'controllers'));
                    fs.appendFile(path.join(modulePath, 'controllers', moduleName + 'Controllers.js'),
                        `function myController() {
                        console.log('myController function');
                        console.log('');
                    }
                    module.exports = {
                        myController
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Controllers file for '${moduleName}' created successfully.`.green);
                    });

                    fs.mkdirSync(path.join(modulePath, 'middlewares'));
                    fs.appendFile(path.join(modulePath, 'middlewares', moduleName + 'Middlewares.js'),
                        `function myMiddleware() {
                        console.log('myMiddleware function');
                        console.log('');
                    }
                    module.exports = {
                        myMiddleware
                    };`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`Middlewares file for '${moduleName}' created successfully.`.green);
                    });

                    console.log(`Module '${moduleName}' created successfully..green`);
        } else {
            console.log(`Module '${moduleName}' already exists..yellow`);
        }

    }
}

module.exports = { createModule }