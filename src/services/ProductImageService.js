//@Author: Bautista

const db = require('../database/models');

const ProductImageService = {

    findProductImagesById: async function(productId){
        try{
            const images = await db.ProductImage.findAll({
                where: {product_id: productId}
            });

            return images;
        }catch(error){
            console.log(error);
            console.log('No se han encontrado imagenes');
        }
    },

    create: async function (imagesPaths, productId) {
        try{
            imagesPaths.forEach((image) => {
                db.ProductImage.create({
                    product_id: productId,
                    image_path: image,
                })
            });
            console.log("Images successfully linked to Product.")
        } catch(error){
            console.log("Product Images link error.")
            console.log(error);
        }

    }
}

module.exports = ProductImageService;
