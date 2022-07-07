module.exports = (sequelize, Sequelize) => {
    let alias = "User";
    
    let cols = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        first_name:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        last_name:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        address:{
            type: Sequelize.STRING(100),
            defaultValue: null,
        },
        zip_code:{
            type: Sequelize.STRING(10),
            defaultValue: null,
        },
        city:{
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        province:{
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        telephone:{
            type: Sequelize.INTEGER(25),
            defaultValue: null,
        },
        gender:{
            type: Sequelize.STRING(15),
            defaultValue: null,
        },
        email:{
            type: Sequelize.STRING(320),
            defaultValue: null,
        },
        password:{
            type: Sequelize.STRING(450),
            defaultValue: null,
        },
/*        SECURITY_QUESTION_ID:{
            type: Sequelize.SMALLINT(3),
            notNull: true
        },*/
        security_answer: {
            type: Sequelize.STRING(320),
            defaultValue: null,
        },
        image: {
            type: Sequelize.STRING(120),
            defaultValue: null,
        },
        category_id:{
            type: Sequelize.SMALLINT(3),
            notNull: true
        },
 /*       CART_ID:{
            type: Sequelize.INTEGER,
            notNull: true
        }/*/
    }

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    }

    const User = sequelize.define(alias, cols, config);

    //++++++++++++++ user associations ++++++++++++++++++++++++++
    User.associate = function(models){

        //user association with his category
       User.belongsTo(models.UserCategory, {
        foreignKey: "category_id"
       })

    /*    //user association with his cart
        User.belongsTo(models.Cart,{
            as: "UserCart",
            foreingKey: "CART_ID"
        });

        User.belongsTo(models.SecurityQuestion, 
            {
                as: "UserSecurityQuestion",
                foreingKey: "SECURITY_QUESTION_ID"
                
            }
        );*/
    }

    return User;
}