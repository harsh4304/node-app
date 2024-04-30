function dashboard(req,res) {
    res.end('Admin signed up successfully');
}

function operator(req,res) {
    res.end('Admin Logged In successfully');
}

module.exports = {
    dashboard,operator
};