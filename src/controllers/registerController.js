const path = require('path');

const RegisterController = {

    display: function(req, res){
        res.render(path.join(__dirname, '../views/users/register.ejs'));
    } ,  
}

//Export.
module.exports = RegisterController;