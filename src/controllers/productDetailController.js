const path = require('path');

const ProductDetailController = {
    display: function(req, res){
        
        res.render(path.join(__dirname, '../views/productDetail.ejs'));
    } ,
}

module.exports = ProductDetailController;

const productos = [
    {
        id: "1",
        titulo: "Siena",
        colores: ["Marrón"],
        categoria: "Botas",
        porcentajeDescuento: "0",
        precio: "10500",
        
    }
    {
        id: "2",
        titulo: "2558",
        colores: ["Negro"],
        categoria: "De vestir",
        porcentajeDescuento: "0",
        precio: "12990",
    }
    {
        id: "3",
        titulo: "RE9",
        colores: ["Marrón"],
        porcentajeDescuento: "0",
        precio: "10500",
    }
]