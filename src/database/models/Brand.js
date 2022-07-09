module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
        ID: {
            type: dataTypes.SMALLINT(8),
            primaryKey: true,
            notNull: true,
        },
        NAME:{
            type: dataTypes.STRING(150),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "BRANDS",
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){

        
        Brand.hasMany(models.Product,{
            as: "Products",
            foreingKey: "BRAND_ID"
        } )

       
    }

    return Brand;
}