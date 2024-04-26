function adminSignup(req, res) {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Admin signed up successfully');
}

function adminLogin(req, res) {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Admin Logged In successfully');
}

module.exports = {
    adminSignup,adminLogin
};