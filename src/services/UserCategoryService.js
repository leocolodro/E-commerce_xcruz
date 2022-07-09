const db = require('../database/models');

const UserCategoryService = {
    getById: function(id){

        const userCategory =  db.UserCategory.findByPk(id)
            .then((dbResponse) => {
               return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
        
            return userCategory
    },

    getAll: function() {
        const categories = db.UserCategory.findAll()
            .then((dbResponse) => {
                return dbResponse;
            })            
            .catch((error) => {
                console.log(error);
            });
        return categories;
    }
}

module.exports = UserCategoryService;