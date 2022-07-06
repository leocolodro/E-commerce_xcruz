module.exports = (sequelize, Sequelize) => {
    let alias = "Users";
    
    let cols = {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        FIRST_NAME:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        LAST_NAME:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        ADDRESS:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        ZIP_CODE:{
            type: Sequelize.STRING(10),
            defaultValue: null,
        },
        CITY:{
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        PROVINCE:{
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        TELEPHONE:{
            type: Sequelize.INTEGER(25),
            defaultValue: null,
        },
        GENDER:{
            type: Sequelize.STRING(15),
            defaultValue: null,
        },
        EMAIL:{
            type: Sequelize.STRING(320),
            defaultValue: null,
        },
        PASSWORD:{
            type: Sequelize.STRING(450),
            defaultValue: null,
        },
        SECURITY_QUESTION_ID:{
            type: Sequelize.SMALLINT(3),
            notNull: true
        },
        SECURITY_ANSWER: {
            type: Sequelize.STRING(320),
            defaultValue: null,
        },
        IMAGE: {
            type: Sequelize.STRING(120),
            defaultValue: null,
        },
        CATEGORY_ID:{
            type: Sequelize.SMALLINT(3),
            notNull: true,
        },
        CART_ID:{
            type: Sequelize.INTEGER,
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

        //user association with his category
        User.belongsTo(models.UserCategories,{
            as: "User_Category",
            foreingKey: "CATEGORY_ID"
        });

        //user association with his cart
        User.belongsTo(models.Carts,{
            as: "Cart",
            foreingKey: "CART_ID"
        });

        User.belongsTo(models.Security_Questions, 
            {
                as: "Security_Question",
                foreingKey: "SECURITY_QUESTION_ID"
            }
        );
    }

    return User;
}