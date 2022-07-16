//@Author: Bautista

const db = require('../database/models');

const SecurityQuestionService = {
    getById: function(id){

        let securityQuestion =  db.SecurityQuestion.findByPk(id)
            .then((dbResponse) => {
               return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
        
            return securityQuestion
    },

    getAll: function() {
        const securityQuestions = db.SecurityQuestion.findAll()
            .then((dbResponse) => {
                return dbResponse;
            })            
            .catch((error) => {
                console.log(error);
            });
        return securityQuestions;
    }
}

module.exports = SecurityQuestionService;