module.exports = app => {
    const Product = require("../Controllers/Product.controller");

    var router = require("express").Router();


    router.get("/queries",Product.queries);

    router.post("/create", Product.create);

    
    router.post("/update/:id", Product.update);

    router.delete("/delete/:name", Product.delete);


    app.use('/', router);
};