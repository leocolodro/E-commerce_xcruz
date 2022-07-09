module.exports = (sequelize, dataTypes) => {
    let alias = "Carts_Products";
    let cols = {
        CART_ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        PRODUCT_ID:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
        },
        QUANTITY:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "CARTS/PRODUCTS",
        timestamps: false
    }

    const Cart_Product = sequelize.define(alias, cols, config);

    
    return Cart_Product;
}