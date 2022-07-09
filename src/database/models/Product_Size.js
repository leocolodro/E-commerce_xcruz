module.exports = (sequelize, dataTypes) => {
    
    let alias = "ProductSize";

    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
        },
        size_id:{
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        }
    }

    let config = {
        tableName: "product_sizes",
        timestamps: false
    }

    const ProductSize = sequelize.define(alias, cols, config);

    return ProductSize;
}