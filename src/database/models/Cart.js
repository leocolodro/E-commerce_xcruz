module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        subtotal:{
            type: dataTypes.DECIMAL(11,2),
            defaultValue: null,
        },
        total:{
            type: dataTypes.DECIMAL(11,2),
            defaultValue: null,
        }

    }

    let config = {
        tableName: "CARTS",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
       
        //cart association with users
        Cart.hasOne(models.User,{
            foreingKey: "cart_id"
        } )

 /*       Cart.belongsToMany(models.Product,{
            as: "Products",
            through: "CARTS/PRODUCTS",
            foreingKey: "CART_ID",
            otherKey: "PRODUCT_ID",
            timestamps: false
        })*/
    }

    return Cart;
}