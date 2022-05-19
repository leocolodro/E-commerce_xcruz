//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Helpers
const jsonProductAnalyzer = require('../helpers/jsonProductAnalyzer.js');
const arrayRandomSortSlicer = require('../helpers/arrayRandomSortSlicer.js')

/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas"];
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

        //PRODUCT NOT FIND
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        //PRODUCT FINDED
        else{
            res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {producto: product, productosRelacionados: productosRelacionadosArray});
        }
    },

    editById: function(req, res){
        //Get products DataBase
        const products = jsonProductAnalyzer.read();

        //Search product in "Products"
        const product = products.find(product => {
            return product.id == req.params.id;
        });
        
        /*Si no encuentra el producto*/
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        /*Sí encuentra el producto*/
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
    }
}

//Export.
module.exports = ProductController;
