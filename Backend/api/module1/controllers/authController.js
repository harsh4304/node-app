function adminSignup(req,res) {
    res.end('Admin signed up successfully');
}

function adminLogin(req,res) {
    res.end('Admin Logged In successfully');
}

module.exports = {
    adminSignup,adminLogin
};