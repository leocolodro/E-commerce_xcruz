//Path Module.
const path = require('path');

//products-array Module.
/*(!)Por el momento se le hara mención en comentarios semejandolo con una base de datos*/ 
/*(!) Quitar, a futuro, por la database de los productos*/ 
const productos = require('../products-array');

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
    
    //Añadir producto

    nuevo: function(req, res){
        res.render(path.join(__dirname, '../views/products/newProduct.ejs'),);
    },

    editar: function(req, res){
        res.render(path.join(__dirname, '../views/products/editProduct.ejs'),);
    }
}

//Export.
module.exports = ProductController;
