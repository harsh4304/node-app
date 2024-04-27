const cron = require('node-cron');
const fs = require('fs')

cron.schedule('*/10 * * * * *', () => {
    cron1Function()
});
function cron1Function() {
    let data = `${new Date().toUTCString()}  
    : Server is working\n`;

    // Appending data to logs.txt file 
    fs.appendFile("cron1.txt", data, function (err) {

        if (err) throw err;

        console.log("cron1 ---> Status Logged!");
    });
    console.log('');
}

module.exports = {
    cron1Function
};
