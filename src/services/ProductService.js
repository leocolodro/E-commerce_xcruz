//@Author: Bautista

const db = require('../database/models');
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const brandService = require('./BrandService.js');

const ProductService = {

    getById: async function(id){
        try{
            const product = db.Product.findByPk(id,
                {
                    include: [ 
                        {association: "productBrand"},
                        {association: "productImages"},
                        {association: "productCategory"},
                        {association: "Sizes"}, 
                    ],
                }
            );

        return product;

        }catch(error){
            console.log(error);
            console.log("No se ha encontrado el producto #" + id);
        }
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

                where:{discount_percentage:{ [Op.gt]: 1}},
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


            await  newProduct.addSizes(productData.sizes);


            console.log("Successfully added new Product into Database!");
            
            return newProduct;

        } catch(error){
            console.log("Product creation error.")
            console.log(error);
        }
    },
    
    editById: async function(productId, productData){
        const newBrand = await brandService.create(productData.brandName);
        try{
            await db.Product.update(
                {
                    gender: productData.gender,
                    discount_percentage: productData.discount_percentage,
                    price: productData.price,
                    description: productData.description,
                    color: productData.color,
                    category_id: productData.categoryId
                },
                {
                    where:{id: productId},
                }
            );
            
            let editedProduct = await this.getById(productId);

            await editedProduct.setProductBrand(newBrand);

            await editedProduct.setSizes(productData.sizes);

            return editedProduct;

        }catch(error){
            console.log(error);
            console.log("ERROR.\nNo se ha podido actualizar el producto #" + productId);
        }
       
    },
    delete: async function(productId){
        try{
            await db.Product.destroy({
                where: {id: productId}
            });
            
            console.log("Se ha eliminado correctamente el producto #" + productId);
        }
        catch(error){
            console.log(error);
        }
    } 
}


module.exports = ProductService;