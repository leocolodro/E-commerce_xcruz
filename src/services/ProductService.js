const db = require('../database/models');
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");

const productImageService = require('./ProductImageService');


const ProductService = {

    getById: function(id){
        const product = db.Product.findByPk(id,
            {
                include: [ 
                    {association: "productBrand"},
                    {association: "productImages"},
                    {association: "productCategory"},
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
                        {association: "productCategory"},
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
                        {association: "productCategory"},
                        {association: "Sizes"},
                    ]
            }
        );
        
        return products

        }catch(error){
            console.log(error);
        }  
    },

    //Use this method to bring all products and their joins with Brand and Product_Image from database.
    getAllWithBrandAndImages: async function() {
        try{
            const products = await db.Product.findAll(
                {
                    include: [ 
                        {association: "productBrand"},
                        {association: "productImages"},

                    ]
                }
            );
        return products

        }catch(error){
            console.log(error);
        }  
    },

    getWithDiscountPercentageRand: async function(quantity){
        const products = await db.Product.findAll(
            {
                limit: quantity,

                order: Sequelize.literal('rand()'),

                where:{ [Op.gt]: 0},
                include: [ 
                    {association: "productBrand"},
                    {association: "productImages"},
                    {association: "productCategory"},
                    {association: "Sizes"},
                     
                ]
            },
 
        )
        return products;
    },

    create: async function(productData){
       try{
            let newProduct = await db.Product.create(
                {
                    productBrand: {
                        name: productData.brandName
                    },
                    gender: productData.gender,
                    discount_percentage: productData.discount_percentage,
                    price: productData.price,
                    description: productData.description,
                    color: productData.color,
                    category_id: productData.categoryId
                },
                {
                    include: [ 
                        {association: 'productBrand'},                    
                    ]
                }
            );

            await productData.sizes.forEach((sizeId) =>{
                newProduct.addSizes(sizeId);
            });

            await productImageService.create(productData.imagesPaths, newProduct.id);

            console.log("Successfully added new Product into Database!");

        } catch(error){
            console.log("Product creation error.")
            console.log(error);
        }
    }
}


module.exports = ProductService;