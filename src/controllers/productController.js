//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Path de la base de datos de los productos.
const productosFilePath = path.join(__dirname, '../data/products-database.json');

//Productos DataBase
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas"];
const coloresArray = ["Marron", "Chocolate", "Negro", "Blanco", "Azul", "Habano"];
const tallesArray = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
/*----------------------------------------------------------------------------*/

const ProductController = {
    
    //Mostrar el detalle del producto
    display: function(req, res){

        //Buscar  en la base la id del producto pasado por paramentros en el req.
        const producto = productos.find(producto => {
            return producto.id == req.params.id;
        });

        
        //ONLY FOR TEST
        /* Eliminar más adelante */
        /*-------------------------------------------------------------------*/
        let productosRelacionadosArray = [];
        for(let i=0; i < 3; i++){
            let randomNum = Math.floor(Math.random() * productos.length);
            productosRelacionadosArray[i] = productos[randomNum];
        }
        /*-------------------------------------------------------------------*/

        /*Si no encuentra el producto*/
        if(producto == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        /*Sí encuentra el producto*/
        else{
            res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {producto: producto, productosRelacionados: productosRelacionadosArray});
        }
    },

    editById: function(req, res){

        //Buscar  en la base la id del producto pasado por paramentros en el req.
        const producto = productos.find(producto => {
            return producto.id == req.params.id;
        });
        
        /*Si no encuentra el producto*/
        if(producto == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        /*Sí encuentra el producto*/
        else{
            res.render(path.join(__dirname, '../views/products/editProduct.ejs'),
            {
                producto: producto,  
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
