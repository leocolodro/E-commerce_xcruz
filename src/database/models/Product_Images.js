module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
            defaultValue: null,
        },
        image_path:{
            type: dataTypes.STRING(350),
            defaultValue: null,
        }   
    }

    let config = {
        tablename: "product_images",
        timestamps: false
    }

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models){

        Image.hasMany(models.Product,{
            as: "Product",
            foreingKey: "product_id" 
        } )
    }
    return Image;
}