module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        },
        name:{
            type: dataTypes.STRING(60),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "product_categories",
        timestamps: false
    }

    const Product_Category  = sequelize.define(alias, cols, config);

    Product_Category.associate = function(models){

        
        Product_Category.hasMany(models.Product,{
            as: 'productCategory',
            foreignKey: 'category_id'  
        } )

       
    }

    return Product_Category;
}