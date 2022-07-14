//Path Module.
const path = require('path');

//Helpers
const jsonProductAnalyzer = require('../helpers/jsonProductAnalyzer.js');

/*-------------------------------SERVICES----------------------------------*/

const productService = require('../services/ProductService.js');
const ProductCategoryService = require('../services/ProductCategoryService.js');
const sizesService = require('../services/SizesService.js');
const productImageService = require('../services/ProductImageService.js');


/*-------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
//Los datos dentro de esta sección deberan ser colocados en una base de datos.
const categoriasArray = ["Botas", "Mocacines", "Urbano", "Zapatillas", "De vestir"];
const coloresArray = ["Marron", "Chocolate", "Negro", "Blanco", "Azul", "Habano"];
const tallesArray = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
/*----------------------------------------------------------------------------*/


const ProductController = {
    
    //show product details.
    display: function(req, res){
        
        /*total products to be search for "relationedProducts"*/
        const quantity = 4;

        /*Get <quantity> products from database*/
        const relationatedProducts = productService.getSomeRandomlySorted(quantity);

        /*Get product where product.id = req.params.id from database*/
        const product = productService.getById(req.params.id)

        /*fulfill all promises*/
        Promise.all([relationatedProducts, product])

            .then(([relationatedProducts, product]) => {

                if(product != null){
                    //show product
                    res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {product: product, relationatedProducts: relationatedProducts});
                }
                else{
                    res.send("ERROR!. \nProducto no encontrado!")
                }
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un problema!");
            });
    },

    //list products
    displayAll: function(req, res){
        
        //get all products
        productService.getAllWithBrandAndImages()
            .then((products) => {
                //list products
                res.render(path.join(__dirname, '../views/products/productsList.ejs'), {products : products});
            })
            .catch((error) =>{
                console.log(error);
                res.send("Ha ocurrido un problema!");
            });

    },
    editById: function(req, res){
        //Get products DataBase
        const products = jsonProductAnalyzer.read();

        //Search product in "Products"
        const product = products.find(product => {
            return product.id == req.params.id;
        });
        
        //Product not found
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }

        //Product founded
        else{
            res.render(path.join(__dirname, '../views/products/editProduct.ejs'),
            {
                producto: product,  
                categorias: categoriasArray, 
                colores: coloresArray, 
                talles: tallesArray  
            });
        }
    },

    newProduct: function(req, res){

        const productCategories = ProductCategoryService.getAll()

        const sizes = sizesService.getAll()

        Promise.all([productCategories, sizes])

            .then(([productCategories, sizes]) => {
                res.render(path.join(__dirname, '../views/products/newProduct.ejs'), 
                {   
                    categorias: productCategories, 
                    colores: coloresArray, 
                    sizes: sizes
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    create: async function(req, res){    

        const product = {
            brandName: req.body.brandName,
            color: req.body.color,
            categoryId: req.body.category,
            gender: req.body.gender,
            discount_percentage: Number.parseInt("0"),
            price: Number.parseFloat(req.body.price),
            sizes: req.body.sizes,
            description: req.body.description,
            
        };

        let newProduct = await productService.create(product);

        const imgPath = '/producto_' +  newProduct.id.toString() + '/';

        let newProductImages =  req.files.map(file =>{
            return imgPath + file.filename;
        }) 

        await productImageService.create(newProductImages, newProduct.id);

        res.redirect('/productos');
    
    },

    edit: function(req, res){

        //Get products DataBase
        const products = jsonProductAnalyzer.read();
                
        //Search product in "Products"      
        const product = products.find(product => {         
        return product.id == req.params.id;
        });
        
        //Product not found
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }
                
        //Product founded
        else{
            
            //Generate new product
            let newProductData = {
                titulo : req.body.titulo,
                colores : [req.body.color],
                categoria : req.body.categoria,
                genero : req.body.genero,
                porcentajeDescuento : Number.parseInt("0"),
                precio : Number.parseFloat(req.body.precio),
                talles : [40,42,43],
                descripcion : req.body.descripcion,
                imagenesUrl : product.imagenesUrl
            }

            jsonProductAnalyzer.edit(product.id, newProductData);

            res.redirect('/productos/' + product.id);
        }
    },

    delete: function(req, res){

        //Get products DataBase
        const products = jsonProductAnalyzer.read();

        //Search product in "Products"      
        const product = products.find(product => {         
            return product.id == req.params.id;
        });
        
        //Product not found
        if(product == undefined){
            res.send("ERROR.\nProducto no encontrado!");
        }
                
        //Product founded
        else{
            jsonProductAnalyzer.delete(req.params.id);

            res.redirect('/productos');
        }
    },
    //FOR TESTING
    prueba: async function(req,res){

        /*try{
            let var1 = await db.Product.create(product)
            let var2 = await imagenes(img_paths, var1.id)
        } catch(error){

        }*/
        let var1 = await productService.getAllWithJoins()
        res.json(var1)

            //.then((dbResponse) => {

           // })
           // .catch((error) =>{
           //     res.send("ERROR.\nProducto no encontrad!");
           // });
    }
       
}


//Export.
module.exports = ProductController;
