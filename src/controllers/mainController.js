//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Path de la base de datos de los productos.
const productosFilePath = path.join(__dirname, '../data/products-database.json');

//Productos DataBase
const productService = require('../services/ProductService.js');

const MainController = {
    displayHome: function(req, res){

         /*total products to be search for "relationedProducts"*/
        const quantity = 4;

        /*Get <quantity> products from database*/
        const productsWithDiscount = productService.getWithDiscountPercentageRand(quantity);

        /*Get product where product.id = req.params.id from database*/
        const products = productService.getSomeRandomlySorted(quantity);

        /*fulfill all promises*/
        Promise.all([productsWithDiscount, products])

            .then(([productsWithDiscount, products]) => {

            res.render(path.join(__dirname, '../views/home.ejs'), 
            {
                products: products, 
                productsWithDiscount: productsWithDiscount
            });
        });
        //Si es el tamaño del array: "productos" es mayor al valor de la constante "minArraylenght" 
        /*else{

            //Sortear de manera aleatoria los elementos del array: "productos"
            productos.sort(() => Math.random() > 0.5 ? 1 : -1);
            
            //Array de productos con porcentajeDescuento mayor a 0
            productosEnOferta = productos.filter(producto =>{
                if(producto.porcentajeDescuento > 0){
                    return producto;
                }
            });

            //Reducir tamaño de array a 4.
            productosEnOferta = productosEnOferta.slice(0,4);

            //Tomar 4 productos del array productos.
            productosDestacadosArray = productos.slice(0,4);

            res.render(path.join(__dirname, '../views/home.ejs'), 
            {
                productos: productosDestacadosArray, 
                productosEnOferta: productosEnOferta
            });
        }*/
    }
}

module.exports = MainController;