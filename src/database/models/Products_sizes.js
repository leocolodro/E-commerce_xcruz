module.exports = (sequelize, dataTypes) => {
    let alias = "Products_Sizes";
    let cols = {
        PRODUCT_ID: {
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
        },
        SIZE_ID:{
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
        }
    }

    let config = {
        tableName: "PRODUCT/SIZES",
        timestamps: false
    }

    const Product_Size = sequelize.define(alias, cols, config);

    return Product_Size;
}