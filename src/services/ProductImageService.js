const db = require('../database/models');

const ProductImageService = {

    create: async function (imagesPaths, productId) {
        try{
            imagesPaths.forEach((image) => {
                db.create({
                    product_id: productId,
                    image_path: image,
                })
            });
        } catch(error){
            console.log(error);
        }

    }
}

module.exports = ProductImageService;
