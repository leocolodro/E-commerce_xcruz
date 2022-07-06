const db = require('../database/models');

const UserCategoryService = {
    getById: async function(id){

        let userCategory =  db.UserCategories.findByPk(id)
            .then((dbResponse) => {
               return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
        
            return userCategory
    }
}

module.exports = UserCategoryService;