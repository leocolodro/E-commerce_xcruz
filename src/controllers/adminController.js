//Path Module.
const path = require('path');
/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas"];
const coloresArray = ["Marron", "Chocolate", "Negro", "Blanco", "Azul", "Habano"];
const tallesArray = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
/*----------------------------------------------------------------------------*/

const AdminController = {

    nuevo: function(req, res){
        res.render(path.join(__dirname, '../views/products/newProduct.ejs'), 
        {   
            categorias: categoriasArray, 
            colores: coloresArray, 
            talles: tallesArray
        });
    },

    editar: function(req, res){
        res.render(path.join(__dirname, '../views/products/editProduct.ejs'), {});
    }
}

module.exports = AdminController;

