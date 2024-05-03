function dashboard(req,res,next) {
    res.end('Dashboard page');
        next()

}

function operator(req,res,next) {
    res.end('Operator page');
        next()

}

module.exports = {
    dashboard,operator
};