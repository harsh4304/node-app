function adminSignup(req, res,next) {
    res.end('Admin signed up successfully');
    next()

}

function adminLogin(req, res,next) {
    res.end('Admin Logged In successfully');
    next()

}

module.exports = {
    adminSignup, adminLogin
};