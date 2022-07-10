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
        /*Cart.belongsToMany(models.Product,{
            through: "Cart_Product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        });*/

        //cart association with users
        Cart.hasOne(models.User,{
            foreignKey: "cart_id"
        });

 
    }

    return Cart;
}