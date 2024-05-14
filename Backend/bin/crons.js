const fs = require('fs');
const path = require('path');
const readline = require('readline');
const colors = require('colors');

colors.enable();

function createCrons(name) {
    if (name === undefined) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Please Enter cron file name : `, (answer) => {

            if (answer) {
                const chosenModule = path.join(__dirname, '..', 'crons', `${answer}.js`);
                fs.writeFile(chosenModule, '', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    rl.question(`Enter values to schedule a task : `, (task) => {
                        const cronFunction = `
                            const fs = require('fs');
                            const cron = require('node-cron');
                            cron.schedule('${task}', () => {
                                ${answer}Function();
                            });
                            function ${answer}Function() {
                                let data = \`\${new Date().toUTCString()} : Server is working\\n\`;
                                fs.appendFile("${answer}.txt", data, function (err) {
                                    if (err) throw err;
                                    console.log(" ${answer} ---> Status Logged!");
                                });
                            }
                            module.exports = { ${answer}Function };
                        `;
                        fs.appendFile(chosenModule, cronFunction, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(`Cron job created in ${chosenModule}.`);
                        });
                        rl.close();
                    });
                });
            } else {
                console.log(`Module creation cancelled due to improper name.`.yellow);
                rl.close();
            }
        });
    } else {
        console.log(`Already passed name: ${name}`.yellow);
    }
}

module.exports = { createCrons };

