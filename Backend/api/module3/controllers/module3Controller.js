function about(req,res,next) {
    res.end('About Page');
    next()
}

function contact(req,res,next) {
    res.end('Contact Page');
        next()

}

function name(req,res,next) {
    res.end('Name Page');
        next()

}
module.exports = {
    about,contact,name
};