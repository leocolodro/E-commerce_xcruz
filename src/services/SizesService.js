//@Author: Bautista

const db = require('../database/models');



const SizesService = {

    getById: async function(id){
        try{
            const size = await db.Sizes.findByPk(id)
        
             size;

        } catch(error){

            console.log(error);
        }
    
        return size;
    },
    getAll: async function() {
        try{
            const sizes = await db.Sizes.findAll()
  
            return sizes;

        } catch(error){

            console.log(error);
        }
    }
}   

module.exports = SizesService;