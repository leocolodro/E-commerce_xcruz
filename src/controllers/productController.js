//Path Module.
const path = require('path');

//fs Module.
const fs = require("fs");

//Helpers
const jsonProductAnalyzer = require('../helpers/jsonProductAnalyzer.js');

/*-------------------------------SERVICES----------------------------------*/

const productService = require('../services/ProductService.js');
const ProductCategoryService = require('../services/ProductCategoryService.js');
const sizesService = require('../services/SizesService.js');
const productImageService = require('../services/ProductImageService.js');
const { fdatasyncSync, fstat } = require('fs');


/*-------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas", "De vestir"];
const coloresArray = ["Marron", "Chocolate", "Negro", "Blanco", "Azul", "Habano"];
const tallesArray = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
/*----------------------------------------------------------------------------*/


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
    editById: function(req, res){
        //Get products DataBase
        const products = jsonProductAnalyzer.read();

        //Search product in "Products"
        const product = products.find(product => {
            return product.id == req.params.id;
        });
        
        //Product not found
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        //Product founded
        else{
            res.render(path.join(__dirname, '../views/products/editProduct.ejs'),
            {
                producto: product,  
                categorias: categoriasArray, 
                colores: coloresArray, 
                talles: tallesArray  
            });
        }
    },

    newProduct: function(req, res){

        //Get all Products from Database
        const productCategories = ProductCategoryService.getAll()

        //Get all Sizes from Database
        const sizes = sizesService.getAll()

        //Fulfill all promises
        Promise.all([productCategories, sizes])
            
            //render newProduct.ejs
            .then(([productCategories, sizes]) => {
                res.render(path.join(__dirname, '../views/products/newProduct.ejs'), 
                {   
                    categorias: productCategories, 
                    colores: coloresArray, 
                    sizes: sizes
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

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

    edit: async function(req, res){

        //Get products DataBase
        //const products = jsonProductAnalyzer.read();
                
        //Search product in "Products"      
        //const product = products.find(product => {         
        //return product.id == req.params.id;
        //});
        
        //Product not found
        //if(product == undefined){
        //    res.send("ERROR.\nProducto no encontrado!");
        //}
                
        //Product founded
        //else{
            
            //Generate new product
        //    let newProductData = {
        //        titulo : req.body.titulo,
        //        colores : [req.body.color],
        //        categoria : req.body.categoria,
        //       genero : req.body.genero,
        //        porcentajeDescuento : Number.parseInt("0"),
        //        precio : Number.parseFloat(req.body.precio),
        //       talles : [40,42,43],
        //        descripcion : req.body.descripcion,
        //       imagenesUrl : product.imagenesUrl
        //    }

        //    jsonProductAnalyzer.edit(product.id, newProductData);

        await

        res.redirect('/productos/' + product.id);
        
    },

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
