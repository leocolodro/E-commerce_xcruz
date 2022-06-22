const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { validationResult } = require('express-validator');

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

    create: (req, res) => {
      let errors = validationResult(req);
      const newUserId = jsonUsersAnalyzer.read().length + 1;
      const newUserImagePath = "/" + newUserId + "/";
      if (errors.isEmpty()) {
        let user = {
          id: newUserId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          image:  req.file ? (newUserImagePath + req.file.filename) : "/default_profile_pic.png"
        }
        
        let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/users-database.json'), 'utf-8');
        
        let users;
        
        if (archivoUsers == "") {
          users = [];
        } 
        else {
          users = JSON.parse(archivoUsers);
        };
  
        users.push(user);

        usersJSON = JSON.stringify(users, null, "\t");
        
        fs.writeFileSync(path.resolve(__dirname, '../data/users-database.json'), usersJSON);
        
        res.redirect('/');
      } 
      else {
        return res.render(path.join(__dirname, '../views/users/register.ejs'), 
        {
          errorMessages: errors.array(), 
          old: req.body
        });
      }
    }
}

//Export.
module.exports = UserController;