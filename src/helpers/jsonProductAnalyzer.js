//Author: Bautista.

//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Products DataBase path 
const productsFilePath = path.join(__dirname, '../data/products-database.json');

//Products DataBase

const JsonProductsAnalyzer = {

    read: function() {
        //Products DataBase
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //if array is empty, returns a default mockup
        if(products.length === 0){
            return [
                {
                    id: 1,
                    titulo: "Example",
                    colores: ["Marron","Negro"],
                    categoria: "Botas",
                    porcentajeDescuento: 0,
                    precio: 0,
                    talles: [40,42,43],
                    descripcion: "Este producto está a modo de ejemplo.\nEliminar una vez que haya agregado productos",
                    imagenesUrl: ["/img-zapato-default.webp"]
                }
            ];
        }
        //returns products array 
        else{
            return products;
        }
    },

    /*++++++++++++++++++++Change to create+++++++++++++++++++++++++++*/
    write: function(newProduct) {
        //Get products DataBase.
        let products = this.read();
        
        //Adds new product
        products.push(newProduct);

        //Transform to JSON.
		const newData = JSON.stringify(products, null, "\t");

        //Write File.
		fs.writeFile(productsFilePath, newData, err => {
			
            // error checking
			if(err) throw err;

			console.log("New data added -> products-database");
		});  
    },

    edit: function(productId, newProductData){
        //Get products DataBase.
        let products = this.read();

        //Edit product
        products.forEach(product => {
        if(product.id == productId){
            product.titulo = newProductData.titulo;
            /*Modifiy*/
            product.colores = newProductData.colores;
            product.categoria = newProductData.categoria;
            product.genero = newProductData.genero;
            product.porcentajeDescuento = newProductData.porcentajeDescuento;
            product.precio = newProductData.precio;
            /*Modifiy*/
            product.talles = newProductData.talles;
            product.descripcion = newProductData.descripcion;
            /*Modifiy*/
            product.imagenesUrl = newProductData.imagenesUrl;  
        }});
          
        //Transform to JSON.
		const newData = JSON.stringify(products, null, "\t");
          
        //Write File.
        fs.writeFile(productsFilePath, newData, err => {
			
            // error checking
			if(err) throw err;

			console.log("data modified -> products-database");
		});
    },

    delete: function(productId){
        //Get products from DataBase
        let products = this.read();
        
        //Product images folder path.
        const productImagesFolderPath = path.join(__dirname, '../../public/images/products/producto_' + productId.toString());

        //Search and remove product.
        const productsFiltered = products.filter(product => {
            return product.id != productId
        });

        //Transform to JSON.
		const newData = JSON.stringify(productsFiltered, null, "\t");
          
        //Write File.
		fs.writeFile(productsFilePath, newData, err => {
            //Error checking
			if(err) throw err;

			console.log("product #"+ productId, "has been deleted -> products-database");
		});

        //Delete files & directory 
        fs.rmdir(productImagesFolderPath, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }   
            console.log(`${productImagesFolderPath} is deleted!`);
        });
    }
}

module.exports = JsonProductsAnalyzer;