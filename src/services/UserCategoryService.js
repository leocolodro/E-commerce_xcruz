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
            const categories = await db.UserCategory.findAll()
  
            return categories;

        } catch(error){

            console.log(error);
        }
        return categories;
    },

    getByName: async function(name){
        try{
            const category = db.UserCategory.findOne({
                where:{name: name}
            });
            return category
        }
        catch(error){
            console.log(error);
            console.log("No se ha encontrado la categoria.")
        }
    }
}

module.exports = UserCategoryService;