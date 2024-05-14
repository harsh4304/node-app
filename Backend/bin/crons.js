const fs = require('fs');
const path = require('path');
const readline = require('readline');
const colors = require('colors')
colors.enable()

function createCrons(name){
    if (apidata === undefined) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question(`Please Enter crons file name`, (answer) => {

            if (answer) {
                    const chosenModule = path.join(__dirname, '..', 'crons');
                                                    
            } else {
                console.log(`Module creation cancelled due to improper name.`.yellow);
                rl.close();

            }
        });
    } else {
        
    }
}

module.exports = { createCrons };