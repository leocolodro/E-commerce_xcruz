module.exports = (sequelize, dataTypes) => {
    let alias = "CartProducts";
    let cols = {
        
        cart_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,

        },
        product_id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,

        },
        quantity:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "carts_products", 
        timestamps: false,
        underscored: true
    }

    const Cart_Product = sequelize.define(alias, cols, config);

    return Cart_Product;
}