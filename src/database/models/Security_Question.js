//@Author: Bautista

module.exports = (sequelize, dataTypes) => {

    let alias = "SecurityQuestion";

    let cols = {
        id: {
            type: dataTypes.SMALLINT(3),
            notNull: true,
            primaryKey: true,
            autoIncrement: true
            
        },
        question:{
            type: dataTypes.STRING(50),
            defaultValue: null,
        }
    }

    let config = {
        tableName: "security_questions",
        timestamps: false
    }

    const Security_Question = sequelize.define(alias, cols, config);

    Security_Question.associate = function(models){
        Security_Question.hasOne(models.User,{
            foreingKey: "security_question_id"
        } )
    }

    return Security_Question;
}