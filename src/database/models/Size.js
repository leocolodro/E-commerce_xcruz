module.exports = (sequelize, dataTypes) => {
    let alias = "Sizes";
    let cols = {
        id: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        },
        TYPE:{
            type: dataTypes.STRING(15),
            defaultValue: null,
        },
        VALUE:{
            type: dataTypes.DECIMAL(3,1),
            defaultValue: null,
        },
    }

    let config = {
        tableName: "SIZES",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config);

    Size.associate = function(models){

        Size.belongsToMany(models.Products,{
            as: "Products",
            through: "PRODUCT/SIZES",
            foreingKey: "SIZE_ID",
            otherKey: "PRODUCT_ID",
            timestamps: false
        })

    }
    return Size;
}