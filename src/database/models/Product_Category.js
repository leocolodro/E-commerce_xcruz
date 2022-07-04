module.exports = (sequelize, dataTypes) => {
    let alias = "Product_Categories";
    let cols = {
        id: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        },
        NAME:{
            type: dataTypes.STRING(60),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "PRODUCT_CATEGORIES",
        timestamps: false
    }

    const Product_Category  = sequelize.define(alias, cols, config);

    Product_Category.associate = function(models){

        
        Product_Category.hasMany(models.Products,{
            as: "Products",
            foreingKey: "CATEGORY_ID"
        } )

       
    }

    return Product_Category;
}