module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        TITLE:{
            type: dataTypes.STRING(150),
            defaultValue: null,
        },
        GENDER:{
            type: dataTypes.STRING(30),
            defaultValue: null,
        },
        DISCOUNT_PERCENTAGE:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        },
        PRICE:{
            type: dataTypes.DECIMAL(11,2),
            defaultValue: null,
        },
        DESCRIPTION:{
            type: dataTypes.STRING(500),
            defaultValue: null,
        },
        COLOR:{
            type: dataTypes.STRING(30),
            defaultValue: null,
        },
        CATEGORY_ID:{
            type: dataTypes.SMALLINT(3),
            defaultValue: null,
        },
        BRAND_ID:{
            type: dataTypes.SMALLINT(8),
            defaultValue: null,
        },
    }

    let config = {
        tableName: "PRODUCTS",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    //++++++++++++++ Products associations ++++++++++++++++++++++++++
    Product.associate = function(models){

        
        Product.belongsTo(models.Brands,{
            as: "Brands",
            foreingKey: "BRAND_ID"
        } )


        Product.belongsTo(models.Product_Categories,{
            as: "Categories",
            foreingKey: "CATEGORY_ID"
        } )

        Product.belongsTo(models.Product_Images,{
            as: "Images",
            foreingKey: "PRODUCT_ID"
        } )

        Product.belongsToMany(models.Carts,{
            as: "Carts",
            through: "CARTS/PRODUCTS",
            foreingKey: "PRODUCT_ID",
            otherKey: "CART_ID",
            timestamps: false
        })

        Product.belongsToMany(models.Sizes,{
            as: "Sizes",
            through: "PRODUCT/SIZES",
            foreingKey: "PRODUCT_ID",
            otherKey: "SIZE_ID",
            timestamps: false
        })

    }

    return Product;
}