//@Author: Bautista

module.exports = (sequelize, dataTypes) => {

    let alias = "Security_Questions";

    let cols = {
        ID: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
            autoIncrement: true
            
        },
        QUESTION:{
            type: dataTypes.STRING(50),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "SECURITY_QUESTIONS",
        timestamps: false
    }

    const Security_Question = sequelize.define(alias, cols, config);

    Security_Question.associate = function(models){
        Security_Question.hasOne(models.Users,{
            as: "Users",
            foreingKey: "SECURITY_QUESTION_ID"
        } )
    }

    return Security_Question;
}