//@Author: Bautista

/*-------------------------------SERVICES----------------------------------*/
const productService = require('../../services/ProductService.js');
const productCategoryService = require('../../services/ProductCategoryService');
/*-------------------------------------------------------------------------*/


const productApiController = {

    listAll: async function(req, res){
        try {
            //Get all products from Database
            const products = await productService.getAllWithJoins();
            const productCategories = await productCategoryService.getAll();
            
            
            //Get hostname
            const hostname = req.headers.host;

            //Filter user data
            let processedData = 
                products.map(product => {
                    return(
                        {
                            id: product.id,
                            name: product.productBrand.name,
                            description: product.description,
                            category: product.productCategory,
                            detail: ('http://' + hostname + "/productos/" + product.id)
                        }
                    )
                });
            
            //it fills with objects with the products categories and total amount of products with that category
            let categoriesArrayCount = [];
            
            //loop productCategories
            for(let i = 0; i < productCategories.length; i++){
                //counter re-starts every time a category changes. 
                let count = 0;
                //loop products
                for(let j = 0; j < products.length; j++){
                    //filter
                    if(productCategories[i].id == products[j].category_id){
                        //count an equality
                        count++;
                    }
                }
                //push category and total amount of products with that category
                categoriesArrayCount.push(
                    {
                        category_name: productCategories[i].name,
                        total_amount: count
                    }
                );
            }
            
            //send data.
            res.status(200).json(
                {
                    msg: "OK",
                    status: 200,
                    count: products.length,
                    countByCategory: categoriesArrayCount,
                    data: processedData
                }
            );
        }
        catch(error){
            res.status(404).send({msg: "ERROR", status: 404})
            console.log(error);
        }
    },
    
    listOne: async function(req, res){
        try{
            //Get user from Database
            const product = await productService.getById(req.params.id);
            
            //Get hostname
            const hostname = req.headers.host;

            //Filter user data.
            const processedData = {
                id: product.id,
                brand: product.productBrand,
                description: product.description,
                price: product.price,
                gender: product.gender,
                discount_percentage: product.discount_percentage,
                color: product.color,
                category: product.productCategory,
                sizes: product.Sizes,
                images: product.productImages,
                firstImage: 'http://' + hostname + "/images/products" + product.productImages[0].image_path
                }
            
            //send data.
            res.status(200).json(
                {
                    msg: "OK",
                    status: 200,
                    data: processedData
                }
            );
            
        }
        catch(error){
            res.status(404).send({msg: "ERROR", status: 404})
            console.log(error);
        }
        
    }

}

module.exports = productApiController;