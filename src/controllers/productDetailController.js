//Path Module.
const path = require('path');

//products-array Module.
/*(!)Por el momento se le hara mención en comentarios semejandolo con una base de datos*/ 
/*(!) Quitar, a futuro, por la database de los productos*/ 
const productos = require('../products-array');

const ProductDetailController = {
    
    //Mostrar el detalle del producto
    display: function(req, res){

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
            res.render(path.join(__dirname, '../views/productDetail.ejs'), {producto: producto});
        }    
    }
}

//Export.
module.exports = ProductDetailController;
