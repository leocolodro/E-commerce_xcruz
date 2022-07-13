const db = require('../database/models');


const BrandService = {

    create: function (brand) {
        try{
        db.create({
                name: brand.name
            });
        } catch(error){
            console.log(error);
        }
    return newBrand
    }
}

module.exports = BrandService;


