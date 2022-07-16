//@Author: Bautista

const db = require('../database/models');

const ProductCategoryService= {
    getById: async function(id){

        const category =  db.ProductCategory.findByPk(id)
            .then((dbResponse) => {
               return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
        
            return category
    },

    getAll: async function() {
        try{

            const categories = await db.ProductCategory.findAll()
        
            return categories;

        } catch(error){

            console.log(error);
        }
    }
}

module.exports = ProductCategoryService;