#!/usr/bin/env node

const { startServer } = require('../server.js');
const { createModule } = require('./modules.js');
const { createApi } = require('./api.js');

if (process.argv[2] === 'start') {
    startServer();
}
else if (process.argv[2] === ('--create' || '--c')) {
    if (process.argv[3] === 'module') {
        createModule(process.argv[5]);
    }
    else if (process.argv[3] === 'api') {
        createApi(process.argv[5]);
    }
    else if(process.argv[3] === 'crons') {
        createCrons(process.argv[5])
    }
}
else {
    console.log('Unknown command. Usage: framework start');
}