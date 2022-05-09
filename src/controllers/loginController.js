const path = require('path');

const LoginController = {

    display: function(req, res){
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    } ,  
}

//Export.
module.exports = LoginController;