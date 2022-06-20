//File-System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Helpers
const jsonProductAnalyzer = require('../helpers/jsonProductAnalyzer.js');
const arrayRandomSortSlicer = require('../helpers/arrayRandomSortSlicer.js');
const { join } = require('path');

/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas", "De vestir"];
const coloresArray = ["Marron", "Chocolate", "Negro", "Blanco", "Azul", "Habano"];
const tallesArray = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
/*----------------------------------------------------------------------------*/

const ProductController = {
    
    //Mostrar el detalle del producto
    display: function(req, res){
        
        //Get products DataBase
        const products = jsonProductAnalyzer.read();
        let productosRelacionadosArray = [];
        /*Don´t  touch*/
        const sliceSize = 4;

        //Search product in "Products"
        const product = products.find(product => {
            return product.id == req.params.id;
        });

        //Sort and slice.
        productosRelacionadosArray = arrayRandomSortSlicer(products, sliceSize);

        //PRODUCT NOT FOUND
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        //PRODUCT FOUNDED
        else{
            res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {producto: product, productosRelacionados: productosRelacionadosArray});
        }
    },
    displayAll: function(req, res){
        const products = jsonProductAnalyzer.read();
        res.render(path.join(__dirname, '../views/products/productsList.ejs'), {productos : products});
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
        res.render(path.join(__dirname, '../views/products/newProduct.ejs'), 
        {   
            categorias: categoriasArray, 
            colores: coloresArray, 
            talles: tallesArray
        });
    },

    create: function(req, res){    
        const products = jsonProductAnalyzer.read();

        const newProductId = products.length + 1; 
        
        const imgPath = '/producto_' + newProductId.toString() + '/';

        let newProductImages = req.files.map(file =>{
            return imgPath +file.filename;
        }) 

        console.log(newProductImages);

        const newProduct = {
            id: newProductId,
            titulo: req.body.titulo,
            colores: [req.body.color],
            categoria: req.body.categoria,
            genero: req.body.genero,
            porcentajeDescuento: Number.parseInt("0"),
            precio: Number.parseFloat(req.body.precio),
            talles: [40,42,43],
            descripcion: req.body.descripcion,
            imagenesUrl: newProductImages
        }

        jsonProductAnalyzer.write(newProduct);
        
        res.redirect('/productos');
    },

    edit: function(req, res){

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
            
            //Generate new product
            let newProductData = {
                titulo : req.body.titulo,
                colores : [req.body.color],
                categoria : req.body.categoria,
                genero : req.body.genero,
                porcentajeDescuento : Number.parseInt("0"),
                precio : Number.parseFloat(req.body.precio),
                talles : [40,42,43],
                descripcion : req.body.descripcion,
                imagenesUrl : product.imagenesUrl
            }

            jsonProductAnalyzer.edit(product.id, newProductData);

            res.redirect('/productos/' + product.id);
        }
    },

    delete: function(req, res){

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
            jsonProductAnalyzer.delete(req.params.id);

            res.redirect('/productos');
        }
    }
}

//Export.
module.exports = ProductController;
