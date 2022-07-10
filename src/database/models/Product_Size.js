module.exports = (sequelize, Sequelize) => {
    
    let alias = "ProductSize";

    let cols = {
        product_id: {
            type: Sequelize.INTEGER,
            notNull: true,
            primaryKey: true,
            references:{
                model:"Product",
                key: "id"
            }
        },
        size_id:{
            type: Sequelize.SMALLINT(3),
            notNull: true,
            primaryKey: true,
            references:{
                model:"Size",
                key: "id"
            }
        }
    }

    let config = {
        tableName: "product_sizes",
        timestamps: false,
        underscored: true
    }

    const ProductSize = sequelize.define(alias, cols, config);
    ProductSize.associate = function(models){
        
        ProductSize.belongsToMany(models.Size,{
            foreignKey:"size_id",
            through: "Size"
        });
        ProductSize.belongsToMany(models.Product,{
            foreignKey: "product_id",
            through: "Product"
        });
    }

    return ProductSize;

    
}