const path = require('path');

const UserController = {

    displayLogin: function(req, res){
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    }, 

    displayRegister: function(req, res){
        res.render(path.join(__dirname, '../views/users/register.ejs'));
    },
}

//Export.
module.exports = UserController;