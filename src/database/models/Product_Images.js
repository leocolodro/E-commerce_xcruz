module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
        },
        PRODUCT_ID: {
            type: dataTypes.INTEGER,
            defaultValue: null,
        },
        IMAGE_PATH:{
            type: dataTypes.STRING(350),
            defaultValue: null,
        }   
    }

    let config = {
        tableName: "PRODUCT_IMAGES",
        timestamps: false
    }

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models){

        Image.hasMany(models.Product,{
            as: "Product",
            foreingKey: "PRODUCT_ID"
        } )
    }
    return Image;
}