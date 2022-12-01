//Path Module.
const path = require('path');

//fs Module.
const fs = require("fs");
const { fdatasyncSync, fstat } = require('fs');

/*-------------------------------SERVICES----------------------------------*/

const productService = require('../services/ProductService.js');
const productCategoryService = require('../services/ProductCategoryService.js');
const sizesService = require('../services/SizesService.js');
const productImageService = require('../services/ProductImageService.js');
/*-------------------------------------------------------------------------*/


const ProductController = {
    
    //show product details.
    display: function(req, res){
        
        /*total products to be search for "relationedProducts"*/
        const quantity = 4;

        /*Get <quantity> products from database*/
        const relationatedProducts = productService.getSomeRandomlySorted(quantity);

        /*Get product where product.id = req.params.id from database*/
        const product = productService.getById(req.params.id)

        /*fulfill all promises*/
        Promise.all([relationatedProducts, product])

            .then(([relationatedProducts, product]) => {

                if(product != null){
                    //show product
                    res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {product: product, relationatedProducts: relationatedProducts});
                }
                else{
                    res.send("ERROR!. \nProducto no encontrado!")
                }
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un problema!");
            });
    },

    //list products
    displayAll: function(req, res){
        
        //get all products
        productService.getAllWithBrandAndImages()
            .then((products) => {
                //list products
                res.render(path.join(__dirname, '../views/products/productsList.ejs'), {products : products});
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un problema!");
            });

    },

    //display editProduct.ejs with product and data
    editById: function(req, res){

        //Get products from DataBase
        const product = productService.getById(req.params.id);

        //Get sizes from Database
        const sizes = sizesService.getAll();

        //Get product categories from Dataabse
        const productCategories = productCategoryService.getAll();

        //Fulfill all promises
        Promise.all([product, productCategories, sizes])
            
            //render newProduct.ejs
            .then(([product, productCategories, sizes]) => {
                res.render(path.join(__dirname, '../views/products/editProduct.ejs'),
                {
                    product: product,  
                    categories: productCategories,  
                    sizes: sizes 
                });
            });
            
    },

    //Display newProduct.ejs
    newProduct: function(req, res){

        //Get all Products from Database
        const productCategories = productCategoryService.getAll()

        //Get all Sizes from Database
        const sizes = sizesService.getAll()

        //Fulfill all promises
        Promise.all([productCategories, sizes])
            
            //render newProduct.ejs
            .then(([productCategories, sizes]) => {
                res.render(path.join(__dirname, '../views/products/newProduct.ejs'), 
                {   
                    categorias: productCategories, 
                    sizes: sizes
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    //Product creation (productRouter -> Post)
    create: async function(req, res){  

        //Get data from req
        const product = {
            brandName: req.body.brandName,
            color: req.body.color,
            categoryId: req.body.category,
            gender: req.body.gender,
            discount_percentage: Number.parseInt("0"),
            price: Number.parseFloat(req.body.price),
            sizes: req.body.sizes,
            description: req.body.description,
            
        };

        //Add Product into database
        let newProduct = await productService.create(product);

        //Get images info and generate array with image paths
        let newProductImages =  req.files.map(file =>{
            return  file.filename;
        }) 

        //Link image with Product
        await productImageService.create(newProductImages, newProduct.id);

        //redirect to productsList*/
        res.redirect('/productos');
    
    },
    //Product edition (productRouter -> Put)
    edit: async function(req, res){

        try{
            //Get data from req
            const productData = {
                brandName: req.body.brandName,
                color: req.body.color,
                categoryId: req.body.categoryId,
                gender: req.body.gender,
                price: Number.parseFloat(req.body.price),
                sizes: req.body.sizes,
                description: req.body.description,
            
            };

            //Edit product data in Database
            const productEdited = await productService.editById(req.params.id, productData);

            //redirect to product
            res.redirect('/productos/' + productEdited.id);
            
        }catch(error){
            res.send('Error. \nNo se ha podido editar el producto :/');
        }
        
    },
    //Product removal (productRouter -> destroy)
    delete: async function(req, res){

        let productToDelete = await productService.getById(req.params.id)

        let imagesToDelete = [];

        const imageFolderPath = path.join(__dirname, '../../public/images/products');
       
        productToDelete.productImages.forEach((image) => {
            imagesToDelete.push(image.image_path);
        });
    
        imagesToDelete.forEach((image) =>{
            fs.unlink(imageFolderPath + image, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
       
        await productService.delete(req.params.id);

        res.redirect('/');
        
    }      
}


//Export.
module.exports = ProductController;
