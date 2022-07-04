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
    displayUser: function (req, res){
      //Get users DataBase
      const users = jsonUsersAnalyzer.read();
        

      //Search user in "users"
      const user = users.find(user => {
          return user.id == req.params.id;
      });


      //USER NOT FOUND
      if(user == undefined){
          res.send("ERROR.\nUsuario no encontrado!");
      }

      //USER FOUNDED
      else{
          res.render(path.join(__dirname, '../views/users/userDetail.ejs'), {user: user});
      }
    },

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
    editUser: function(req,res){

      //Get userId
      const userId = req.params.id;
      
      //Get users DataBase
      const users = jsonUsersAnalyzer.read();
        

      //Search user in "users"
      const user = users.find(user => {
          return user.id == userId;
      });

      //USER NOT FOUND
      if(user == undefined){
          res.send("ERROR.\nUsuario no encontrado!");
      }

      //USER FOUNDED
      else{
        //User's new image path
        const newUserImagePath = "/" + userId + "/";

        let newUserData = {
          firstName: req.body.firstName ? req.body.firstName : user.firstName,
          lastName: req.body.lastName ? req.body.firstName : user.lastName,
          address: req.body.address ? req.body.address : user.address,
          zipCode: req.body.zipCode ? req.body.zipCode : user.zipCode,
          city: req.body.city ? req.body.city : user.city,
          province: req.body.province ?  req.body.province : user.province,
          telephone: req.body.telephone ?  req.body.telephone : user.telephone,
          gender: req.body.gender ?  req.body.gender : user.gender,
          email: user.email,
          password: user.password ,
          category: user.category,
          image: req.file ? (newUserImagePath + req.file.filename) : user.image
        }
        
        jsonUsersAnalyzer.edit(userId, newUserData);

        return res.redirect('/');
      }
    },

    deleteUser: function(req, res){
      //Delete user from Database
      jsonUsersAnalyzer.delete(req.params.id);

      //Redirect to users list
      res.redirect('/usuarios');
    },

    processLogin: function(req, res) {
      //Get validation results
      let errors = validationResult(req);
      let userLoggingIn;
      
      //Checking validation errors
      if (errors.isEmpty()) {
        //Get users from Database
        const users = jsonUsersAnalyzer.read();

        //Search user
        for(let i = 0; i<users.length; i++){
          //compare emails
          if(users[i].email == req.body.email){
            //decrypt password and compare
            if(bcrypt.compareSync(req.body.password, users[i].password)){
              userLoggingIn = users[i];
              break;
            }
          }
        }

        //Save Session
        req.session.loggedUser = userLoggingIn;

        //If user wasn't found 
        if(userLoggingIn == undefined){
          return res.render(path.join(__dirname, '../views/users/login.ejs'), 
          {
            errorMessages: [
              {
                msg: "Credenciales invalidas!",
                param: "invalid-credentials"
              }
            ], 
              old: req.body
          });
        }

        //Analayze rememberMe from form.
        if(req.body.rememberMe != undefined){

          //Save cookie, maxAge=24 Hs
          res.cookie('rememberMe', bcrypt.hashSync(userLoggingIn.password, 10), {maxAge: 3600000});

        }

        
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