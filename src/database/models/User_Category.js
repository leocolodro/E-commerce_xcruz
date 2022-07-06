module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategories";
    let cols = {
        ID: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
            
        },
        NAME:{
            type: dataTypes.STRING(80),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "USER_CATEGORIES",
        timestamps: false
    }

    const User_Category = sequelize.define(alias, cols, config);

    User_Category.associate = function(models){
        User_Category.hasMany(models.Users,{
            as: "Users",
            foreingKey: "CATEGORY_ID"
        } )
    }

    return User_Category;
}