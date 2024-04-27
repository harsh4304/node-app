const cron = require('node-cron');

cron.schedule('*/20 * * * * *', () => {
    cron2Function()
});
function cron2Function() {
    console.log('cron2 ---> Cron job executed at:', new Date().toLocaleString());
    console.log('');
}

module.exports = {
    cron2Function
};