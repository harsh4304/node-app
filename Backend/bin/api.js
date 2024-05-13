const fs = require('fs');
const path = require('path');
const readline = require('readline');

function createApi(apidata) {
    console.log(apidata);
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
                    console.log(chosenModule);
                }
            }
            rl.close();



            //         const moduleName = answer;
            //         const modulePath = path.join(__dirname, '..', 'api', moduleName);

            //         fs.mkdirSync(modulePath);

            //         fs.createWriteStream(path.join(modulePath, 'routes.json'));
            //         fs.mkdirSync(path.join(modulePath, 'services'));
            //         fs.mkdirSync(path.join(modulePath, 'functions'));
            //         fs.mkdirSync(path.join(modulePath, 'controllers'));
            //         fs.mkdirSync(path.join(modulePath, 'middlewares'));
            //         console.log(Module '${moduleName}' created successfully..green);

            //     } else {
            //         console.log(Module '${answer}' already exists..yellow);
            //     }
            // } else {
            //     console.log(Module creation cancelled due to improper name..yellow);
            // }
        });
    }
    else {
        // if (!fs.existsSync(name)) {

        //     const moduleName = name;
        //     const modulePath = path.join(__dirname, '..', 'api', moduleName);

        //     fs.mkdirSync(modulePath);

        //     fs.createWriteStream(path.join(modulePath, 'routes.json'));
        //     fs.mkdirSync(path.join(modulePath, 'services'));
        //     fs.mkdirSync(path.join(modulePath, 'functions'));
        //     fs.mkdirSync(path.join(modulePath, 'controllers'));
        //     fs.mkdirSync(path.join(modulePath, 'middlewares'));
        //     console.log(Module '${moduleName}' created successfully..green);
        // } else {
        //     console.log(Module '${moduleName}' already exists..yellow);
        // }

    }
}

module.exports = { createApi }