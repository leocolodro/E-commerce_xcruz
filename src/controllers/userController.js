const path = require('path');

const jsonUsersAnalyzer = require('../helpers/jsonUsersAnalyzer.js')

const UserController = {

    displayUsersList: function(req, res){
        //Get all users from Database.
        const users = jsonUsersAnalyzer.read();

        res.render(path.join(__dirname, '../views/users/usersList.ejs'), {users: users});
    }, 

    displayLogin: function(req, res){
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    },

    displayRegister: function(req, res){
        res.render(path.join(__dirname, '../views/users/register.ejs'));
    },
}

//Export.
module.exports = UserController;