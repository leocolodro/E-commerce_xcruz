const path = require('path');
const productos = require('../products-array');

const ProductDetailController = {
    display: function(req, res){
        const producto = productos.find(producto => {
            return producto.id == req.params.id;
        });

        /*Si no encuentra el producto*/
        if(producto == undefined){
            res.send(console.log("Plato no encontrado."));
        }

        /*Sí encuentra el producto*/
        else{
            res.render(path.join(__dirname, '../views/productDetail.ejs'), {producto: producto});
        }    
    }
}

module.exports = ProductDetailController;
