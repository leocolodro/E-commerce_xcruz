const db = require('../database/models');
const { Sequelize } = require('sequelize')


const ProductService = {
    
    getById: function(id){
        const product = db.Product.findByPk(id,
            {
                include: [ 
                    {association: "productBrand"},
                    {association: "productImages"},
                    {association: "Sizes"},
                     
                ],
            }
        )
        .then((dbResponse) => {
            return dbResponse;
        })
        .catch((error) => {
            console.log(error);
        });

    return product;
    },

    //Use this method to bring <quantity> products from database
    getSomeRandomlySorted: async function(quantity){

            const products = await db.Product.findAll(
                {
                    limit: quantity,

                    order: Sequelize.literal('rand()'),

                    include: [ 
                        {association: "productBrand"},
                        {association: "productImages"},
                        {association: "Sizes"},
                         
                    ]
                },
     
            )
            return products;
    },

    //Use this method to bring all products and their joins from database
    getAllWithJoins: async function(){
        try{
            const products = await db.Product.findAll(
                {
                    include: [ 
                        {association: "productBrand"},
                        {association: "productImages"},
                        {association: "Sizes"},
                        {association: "Carts"}
                    ]
            }
        );
        
        return products
        }catch(error){
            console.log(error);
        }  
    }
}

module.exports = ProductService;