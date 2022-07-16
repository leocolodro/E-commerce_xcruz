//@Author: Bautista

const db = require('../database/models');


const BrandService = {

    create: async function (brandName) {
        try{
            const newBrand = await db.Brand.create({
                name: brandName
                
            });
            
            return newBrand;

        } catch(error){
            console.log(error);
        }

    }
}

module.exports = BrandService;


