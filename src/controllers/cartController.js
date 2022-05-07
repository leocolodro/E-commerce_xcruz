const path = require('path');

const cartController = {

    display: function(req, res){
        res.render(path.join(__dirname, '../views/cart.ejs'));
    } ,  
}

//Export.
module.exports = cartController;