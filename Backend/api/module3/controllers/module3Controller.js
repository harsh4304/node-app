function about(req,res) {
    res.end('About Page');
}

function contact(req,res) {
    res.end('Contact Page');
}

function name(req,res) {
    res.end('Name Page');
}
module.exports = {
    about,contact,name
};