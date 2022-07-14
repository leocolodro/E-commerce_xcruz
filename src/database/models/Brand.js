module.exports = (sequelize, Sequelize) => {
    let alias = "Brand";
    let cols = {
        id: {
            type: Sequelize.SMALLINT(8),
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING(150),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "brands", 
        timestamps: false,
        underscored: true
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){
        Brand.hasMany(models.Product,{
            foreignKey: "brand_id",
            as: "productBrand"

        });
    }

    return Brand;
}