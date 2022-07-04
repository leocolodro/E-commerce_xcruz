module.exports = (sequelize, dataTypes) => {
    let alias = "Carts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        SUBTOTAL:{
            type: dataTypes.DECIMAL(11,2),
            defaultValue: null,
        },
        TOTAL:{
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
        Cart.belongsTo(models.Users,{
            as: "User_Carts",
            foreingKey: "CART_ID"
        } )

        Cart.belongsToMany(models.Products,{
            as: "Products",
            through: "CARTS/PRODUCTS",
            foreingKey: "CART_ID",
            otherKey: "PRODUCT_ID",
            timestamps: false
        })
    }

    return Cart;
}