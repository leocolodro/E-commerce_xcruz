module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
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
    };

    let config = {
        tableName: 'products',
        timestamps: false,
        underscored: true
    };

    const Product = sequelize.define(alias, cols, config);

    //++++++++++++++ Products associations ++++++++++++++++++++++++++
    Product.associate = function(models){
        
        Product.belongsToMany(models.Carts,{
            through: 'CartProducts',
            foreignKey: 'product_id',
            otherKey: 'cart_id',
            timestamps: false
        })

        Product.belongsToMany(models.Sizes,{
            through: 'ProductSizes',
            foreignKey: 'product_id',
            otherKey: 'size_id',
            timestamps: false
        })

        Product.belongsTo(models.Brand,{
            foreignKey: "brand_id",
            as: "productBrand"
        });
        
        Product.hasMany(models.ProductImage, {
            as: 'productImages',
            foreignKey: 'product_id',
        });

        Product.belongsTo(models.ProductCategory,{
            as: 'productCategory',
            foreignKey: "category_id"
            
        });

    }

    return Product;
}