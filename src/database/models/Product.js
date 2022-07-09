module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        title:{
            type: dataTypes.STRING(150),
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
        },
        brand_id:{
            type: dataTypes.SMALLINT(8),
            defaultValue: null,
        },
    }

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    }

    const Product = sequelize.define(alias, cols, config);

    //++++++++++++++ Products associations ++++++++++++++++++++++++++
    Product.associate = function(models){

        
    /*    Product.belongsTo(models.Brand,{
            as: "Brands",
            foreingKey: "BRAND_ID"
        } )


        Product.belongsTo(models.ProductCategory,{
            as: "Categories",
            foreingKey: "CATEGORY_ID"
        } )

        //preguntar esto
        Product.belongsTo(models.ProductImage,{
            as: "Images",
            foreingKey: "PRODUCT_ID"
        } )*/

        Product.belongsToMany(models.Cart,{
            through: "cart_products",
            foreingKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        })

        Product.belongsToMany(models.Size,{
            through: models.ProductSize,
            foreingKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        })

    }

    return Product;
}