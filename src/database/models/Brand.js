module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
        id: {
            type: dataTypes.SMALLINT(8),
            primaryKey: true,
            notNull: true,
        },
        name:{
            type: dataTypes.STRING(150),
            defaultValue: null,
        }
    }

    let config = {
        tablename: "BRANDS",
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){

        
        Brand.hasMany(models.Product,{
            as: "Products",
            foreingKey: "brand_id" 
        } )

       
    }

    return Brand;
}