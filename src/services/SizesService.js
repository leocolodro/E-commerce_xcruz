const db = require('../database/models');



const SizesService = {

    getById: function(id){
        const size = db.Product.findByPk(id)
            .then((dbResponse) => {
                return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
    
        return size;
    },
}   

module.exports = SizesService;