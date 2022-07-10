const db = require('../database/models');


const ProductService = {
    getById: function(id){
        const product = db.Product.findByPk(id,
            {
                include: [ 
                    {association: "productBrand"},
                    {association: "productImages"},
                    {association: "Sizes"},
                    {association: "Carts"}
                     
                ]
            }
)
        .then((dbResponse) => {
            console.log(JSON.stringify(dbResponse, null, "\t"));
        })
        .catch((error) => {
            console.log(error);
        });

    return product;
    },
}

module.exports = ProductService;