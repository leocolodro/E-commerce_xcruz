
module.exports = (sequelize, dataTypes) => {
    let alias = "Sizes";
    let cols = {
        id: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        },
        type:{
            type: dataTypes.STRING(15),
            defaultValue: null,
        },
        value:{
            type: dataTypes.DECIMAL(3,1),
            defaultValue: null,
        },
    }

    let config = {
        tableName: "sizes",
        timestamps: false,
        underscored: true
    }

    const Size = sequelize.define(alias, cols, config);

    Size.associate = function(models){

       Size.belongsToMany(models.Product,{
            through: 'ProductSizes',
            foreignKey: 'size_id',
            otherKey: 'product_id',
            timestamps: false
        })

    }
    return Size;
}