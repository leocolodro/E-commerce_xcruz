module.exports = (sequelize, dataTypes) => {
    let alias = "Carts";
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
        tableName: "carts",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
        Cart.belongsToMany(models.Product,{
            through: 'CartProducts',
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            timestamps: false
        })

        //cart association with users
        Cart.hasOne(models.User,{
            foreignKey: "cart_id"
        });

 
    }

    return Cart;
}