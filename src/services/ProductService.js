const db = require('../database/models');

const ProductService = {
    getById: function(id){
        const product = db.Product.findByPk(id)
        .then((dbResponse) => {
            console.log(dbResponse);
        })
        .catch((error) => {
            console.log(error);
        });

    return product;
    },
}

module.exports = ProductService;