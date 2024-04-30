function adminAbout(req,res) {
    res.end('About Page');
}

function adminContact(req,res) {
    res.end('Contact Page');
}

function adminName(req,res) {
    res.end('Name Page');
}
module.exports = {
    adminAbout,adminContact,adminName
};