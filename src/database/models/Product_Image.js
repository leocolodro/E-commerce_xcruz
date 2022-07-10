module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductImage';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            defaultValue: null,
        },
        image_path:{
            type: dataTypes.STRING(350),
            defaultValue: null,
        }   
    };

    let config = {
        tableName: 'product_images',
        timestamps: false,
        underscored: true
    };

    const Product_Image = sequelize.define(alias, cols, config);

    Product_Image.associate = function (models){

        Product_Image.belongsTo(models.Product,
            {
                as: 'productImages',
                foreignKey: 'product_id'
                
            }
        );
    }
    return Product_Image;
}