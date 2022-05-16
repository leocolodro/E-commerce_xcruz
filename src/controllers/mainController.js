//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Path de la base de datos de los productos.
const productosFilePath = path.join(__dirname, '../data/products-database.json');

//Productos DataBase
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const MainController = {
    displayHome: function(req, res){
        res.render(path.join(__dirname, '../views/home.ejs'), {productos: productos});
    },
}

module.exports = MainController;