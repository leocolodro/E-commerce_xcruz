//@Author: Bautista

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

    getAll: async function() {

        try{
            const categories = await db.UserCatego.findAll()
  
            return categories;

        } catch(error){

            console.log(error);
        }
        return categories;
    }
}

module.exports = UserCategoryService;