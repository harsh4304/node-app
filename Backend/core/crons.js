var fs = require('fs');
const path = require('path');

function loadCronFunctions() {
    const crons = {};
    const crons_path = path.join(__dirname, '..', 'crons');

    const cronsDirectories = fs.readdirSync(crons_path);

    cronsDirectories.forEach(file => {


        const crons_file_name = path.basename(file, '.js');

        const crons_module = require(path.join(crons_path, file));

        crons[crons_file_name] = crons_module

    });
    return crons;
}

module.exports = {
    loadCronFunctions
}