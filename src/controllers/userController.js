const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { validationResult } = require('express-validator');

const jsonUsersAnalyzer = require('../helpers/jsonUsersAnalyzer.js')

const userCategories = {
  user: "Usuario", 
  admin:"Administrador"
};

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

    createUser: (req, res) => {
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
          category: userCategories.user,
          image:  req.file ? (newUserImagePath + req.file.filename) : "/default_profile_pic.png"
        }
        
        jsonUsersAnalyzer.create(user);

        res.redirect('/');
      } 
      else {
        return res.render(path.join(__dirname, '../views/users/register.ejs'), 
        {
          errorMessages: errors.array(), 
          old: req.body
        });
      }
    },

    processLogin: function(req, res) {
      let errors = validationResult(req);
      let userLoggingIn;
      if (errors.isEmpty()) {
        //Get users from Database
        const users = jsonUsersAnalyzer.read();

        for(let i = 0; i<users.length; i++){
          if(users[i].email == req.body.email){
            console.log('email confirmado');
            if(bcrypt.compareSync(req.body.password, users[i].password)){
              console.log("contraseña confirmada");
              userLoggingIn = users[i];
              break;
            }
          }
        }

        if(userLoggingIn == undefined){
          console.log("Hola, me activé!");
          return res.render(path.join(__dirname, '../views/users/login.ejs'), 
          {
            errorMessages: [
              {
                msg: "Credenciales invalidas",
                param: "invalid-credentials"
              }
            ], 
              old: req.body
            });
          }

          req.session.userLogged = userLoggingIn;

          res.redirect('/'); 
      }
      else{
        return res.render(path.join(__dirname, '../views/users/login.ejs'), 
        {
          errorMessages: errors.array(), 
          old: req.body
        });
      }
    }

}

//Export.
module.exports = UserController;