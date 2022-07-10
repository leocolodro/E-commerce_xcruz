module.exports = (sequelize, Sequelize) => {
    let alias = "UserCategory";
    let cols ={
        id: {
            type: Sequelize.SMALLINT(3),
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        name:{
            type: Sequelize.STRING(80),
            defaultValue: null,
        }
    };
    let config = {
        tableName: "user_categories",
        timestamps: false,
        underscored: true
    };
    
    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function(models){

        //user association with his category
       UserCategory.hasMany(models.User ,{
        foreignKey: "category_id",
        as: "user_category"
       })
    }
    return UserCategory;

}