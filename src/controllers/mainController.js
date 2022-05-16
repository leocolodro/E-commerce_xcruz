//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Path de la base de datos de los productos.
const productosFilePath = path.join(__dirname, '../data/products-database.json');

//Productos DataBase
let productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const MainController = {
    displayHome: function(req, res){
        //Tamaño minimo array para aleatoriedad
        const minArrayLength = 4; 
        let productosDestacadosArray = [];

        //Si el tamaño del array "productos" es inferior al valor de la constante "minArraylenght" 
        if(productos.length < minArrayLength){
            productosDestacadosArray = productos;
        }
        //Si es el tamaño del array: "productos" es mayor al valor de la constante "minArraylenght" 
        else{
            //Sortear de manera aleatoria entre 4 items del array: "productos"
            productos.sort(() => Math.random() > 0.5 ? 1 : -1);
            
            //Tomar 4 productos del array productos.
            productosDestacadosArray = productos.slice(0,4);

            res.render(path.join(__dirname, '../views/home.ejs'), {productos: productosDestacadosArray});
        }
    }
}


module.exports = MainController;