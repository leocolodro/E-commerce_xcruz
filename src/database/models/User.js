module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        FIRST_NAME:{
            type: dataTypes.STRING(100),
            defaultValue: null,
        },
        LAST_NAME:{
            type: dataTypes.STRING(100),
            defaultValue: null,
        },
        EMAIL:{
            type: dataTypes.STRING(320),
            defaultValue: null,
        },
        CATEGORY_ID:{
            type: dataTypes.SMALLINT(3),
            notNull: true,
        },
        CART_ID:{
            type: dataTypes.INTEGER,
            notNull: true,
        }
    }

    let config = {
        tableName: "USERS",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    //++++++++++++++ user associations ++++++++++++++++++++++++++
    User.associate = function(models){

        //user association and his category
        User.belongsTo(models.User_Categories,{
            as: "User_Categories",
            foreingKey: "CATEGORY_ID"
        } )

        //user association and his cart
        User.belongsTo(models.Carts,{
            as: "User_Carts",
            foreingKey: "CART_ID"
        } )
    }

    return User;
}