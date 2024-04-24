module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        product_id: { type: Sequelize.INTEGER, primaryKey: true },
        product_name: Sequelize.STRING,
        supplier_id: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
        stock_quantity: Sequelize.INTEGER,
        unit_price: Sequelize.FLOAT
    }, {
        timestamps: false
    });

    return Product
}