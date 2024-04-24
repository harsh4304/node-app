const db = require('../models');
const Product = db.Product;

exports.queries = (req, res) => {
    Product.findAll()
        .then(result => {
            return res.json(result)
        })
        .catch((error) => {
            console.error('Failed to fetch data : ', error);
        });

    Product.bulkCreate([
        {
            product_id: 6,
            product_name: 'Product 6',
            supplier_id: 2,
            category_id: 1,
            stock_quantity: 10,
            unit_price: 12000
        }
    ], { updateOnDuplicate: ["product_name", "unit_price"] })
}

exports.create = (req, res) => {

    Product.bulkCreate([
        {
            product_id: 6,
            product_name: req.body.name,
            supplier_id: 2,
            category_id: 1,
            stock_quantity: 10,
            unit_price: 1200
        }
    ])
        .then(function () {
            return Product.findAll()
        })
        .catch((error) => {
            console.error('Failed to fetch data : ', error);
        });

    // db.query('insert into react.reactmysql (name,country,age) values (?,?,?)', {
    //     replacements: [name, country, age],
    //     type: db.QueryTypes.INSERT
    // })
    //     .then(result => {
    //         return res.json(result);
    //     }).catch((error) => {
    //         console.error('Failed to fetch data : ', error);
    //     });
}
exports.update = (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const country = req.body.country;
    const age = req.body.age;


    Product.update(
        {
            product_id: id,
            product_name: req.body.name,
            supplier_id: 2,
            category_id: 1,
            stock_quantity: 10,
            unit_price: 1200
        },
        { where: { product_id: id } }
    )
        .then(function () {
            return Product.findAll()
        })
        .catch((error) => {
            console.error('Failed to fetch data : ', error);
        });
    // db.query('update react.reactmysql set name = ?,country = ?,age = ? where id=?', {
    //     replacements: [name, country, age, id],
    //     type: db.QueryTypes.UPDATE
    // })
    //     .then(result => {
    //         return res.json(result);
    //     }).catch((error) => {
    //         console.error('Failed to fetch data : ', error);
    //     });

}

exports.delete = (req, res) => {
    const name = req.params.name;
    Product.destroy(
        { where: { product_name: name } }
    )
    .then(function (deletedRows) {
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    })
        .catch((error) => {
            console.error('Failed to fetch data : ', error);
        });

    // db.query('delete from react.reactmysql WHERE id= ?', {
    //     replacements: [id],
    //     type: db.QueryTypes.DELETE
    // })
    //     .then(result => {
    //         return res.json(result);
    //     }).catch((error) => {
    //         console.error('Failed to fetch data : ', error);
    //     });

}
