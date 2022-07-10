module.exports = (sequelize, Sequelize) => {
    
    let alias = 'ProductSizes';

    let cols = {
        product_id: {
            type: Sequelize.INTEGER,
            notNull: true,
            primaryKey: true,

        },
        size_id:{
            type: Sequelize.SMALLINT(3),
            notNull: true,
            primaryKey: true,

        }
    }

    let config = {
        tableName: 'product_sizes',
        timestamps: false,
        underscored: true
    }

    const Product_Size = sequelize.define(alias, cols, config);
    


    return Product_Size;

    
}