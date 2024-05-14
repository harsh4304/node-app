const fs = require('fs');
const path = require('path');
const readline = require('readline');

function createApi(apidata) {
    if (apidata === undefined) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log(`Please choose module : `);
        const modulesPath = path.join(__dirname, '..', 'api');
        const moduleDirectories = fs.readdirSync(modulesPath);
        moduleDirectories.forEach(moduleDir => {
            console.log(moduleDir);
        });
        rl.question(``, (answer) => {
            if (answer) {
                if (moduleDirectories.includes(answer)) {
                    const chosenModule = path.join(__dirname, '..', 'api', answer, 'routes.json');
                    console.log(`Selected Module : ${answer}`);

                    rl.question(`Enter method: `, (method) => {
                        rl.question(`Enter endpoint path (/): `, (endpoint) => {
                            rl.question(`Enter action: `, (action) => {
                                rl.question(`Is public (y/N): `, (isPublic) => {
                                    rl.question(`Enter module middlewares (comma-separated): `, (moduleMiddlewares) => {
                                        rl.question(`Enter global middlewares (comma-separated): `, (globalMiddlewares) => {
                                            rl.question(`Is path from root (y/N): `, (isPathFromRoot) => {
                                                rl.question(`Is enabled (y/N): `, (isEnabled) => {
                                                    const data = {
                                                        path: endpoint,
                                                        method: method,
                                                        action: action,
                                                        public: isPublic.toLowerCase() === 'y' ? true : false,
                                                        globalMiddlewares: globalMiddlewares.split(',').map(m => m.trim()),
                                                        middlewares: moduleMiddlewares.split(',').map(m => m.trim()),
                                                        pathFromRoot: isPathFromRoot.toLowerCase() === 'y' ? true : false,
                                                        enabled: isEnabled.toLowerCase() === 'y' ? true : false
                                                    };

                                                    let existingData = [];
                                                    try {
                                                        existingData = JSON.parse(fs.readFileSync(chosenModule));
                                                    } catch (error) {
                                                        console.error("Error reading existing data:", error);
                                                    }

                                                    existingData.push(data)

                                                    fs.writeFile(chosenModule, JSON.stringify(existingData, null, 2), (err) => {
                                                        if (err) {
                                                            console.error("Error writing updated data:", err);
                                                            return;
                                                        }
                                                        console.log(`Data appended successfully to ${chosenModule}`);

                                                        rl.close();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                } else {
                    console.log(`Module '${answer}' not found.`);
                    rl.close();
                }
            } else {
                console.log(`No module selected.`);
                rl.close();
            }
        });
    } else {
        const { method, endpoint, action, isPublic, moduleMiddlewares, globalMiddlewares, isPathFromRoot } = apidata;
        const data = {
            path: endpoint,
            method: method,
            action: action,
            public: isPublic.toLowerCase() === 'y' ? true : false,
            globalMiddlewares: globalMiddlewares.split(',').map(m => m.trim()),
            middlewares: moduleMiddlewares.split(',').map(m => m.trim()),
            pathFromRoot: isPathFromRoot.toLowerCase() === 'y' ? true : false,
            enabled: isEnabled.toLowerCase() === 'y' ? true : false
        };

        let existingData = [];
        try {
            existingData = JSON.parse(fs.readFileSync(chosenModule));
        } catch (error) {
            console.error("Error reading existing data:", error);
        }

        existingData.push(data)

        fs.writeFile(chosenModule, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error("Error writing updated data:", err);
                return;
            }
            console.log(`Data appended successfully to ${chosenModule}`);

            rl.close();
        });
    }
}

module.exports = { createApi };
