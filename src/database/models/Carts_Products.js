module.exports = (sequelize, dataTypes) => {
    let alias = "Carts_Products";
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
        timestamps: false
    }

    const Cart_Product = sequelize.define(alias, cols, config);

    
    return Cart_Product;
}