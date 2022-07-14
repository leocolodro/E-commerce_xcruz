const db = require('../database/models');

const ProductImageService = {

    create: async function (imagesPaths, productId) {
        try{
            imagesPaths.forEach((image) => {
                db.ProductImage.create({
                    product_id: productId,
                    image_path: image,
                })
            });
        } catch(error){
            console.log("Product Images link error.")
            console.log(error);
        }

    }
}

module.exports = ProductImageService;
