module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        brand_id:{
            type: dataTypes.SMALLINT(8),
            defaultValue: null,
        },
        gender:{
            type: dataTypes.STRING(30),
            defaultValue: null,
        },
        discount_percentage:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        },
        price:{
            type: dataTypes.DECIMAL(11,2),
            defaultValue: null,
        },
        description:{
            type: dataTypes.STRING(500),
            defaultValue: null,
        },
        color:{
            type: dataTypes.STRING(30),
            defaultValue: null,
        },
        category_id:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    }

    const Product = sequelize.define(alias, cols, config);

    //++++++++++++++ Products associations ++++++++++++++++++++++++++
    Product.associate = function(models){
        
       /* Product.belongsToMany(models.Cart,{
            through: "Cart_Product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        })*/

        /*Product.belongsToMany(models.Size,{
            through: "ProductSize",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        })*/

        Product.belongsTo(models.Brand,{
            foreingKey: "brand_id",
        });

            //TO DO -> Product_Category
    }

    return Product;
}