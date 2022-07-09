const db = require('../database/models');

const ProductService = {
    getById: function(id){
        const product = db.Product.findByPk(id,
            {
                include: "Size"
            }
        )
        .then((dbResponse) => {
            return (JSON.stringify(dbResponse, null, "\t"));
        })
        .catch((error) => {
            console.log(error);
        });

    return product;
    },
}

module.exports = ProductService;