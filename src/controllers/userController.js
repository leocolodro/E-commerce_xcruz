//@Author: Bautista

/**************************** Require's ******************************/
//Path Module
const path = require('path');

//Fs module
const fs = require('fs');

//Bcrypt Module
const bcrypt = require('bcryptjs');

//Express-validator module -> validationResult
const { validationResult } = require('express-validator');

/*********************************************************************/

/*-------------------------------SERVICES----------------------------------*/
const userService = require('../services/UserService.js');
const securityQuestionService = require('../services/SecurityQuestionService.js');
const userCategoryService = require('../services/UserCategoryService.js');
/*-------------------------------------------------------------------------*/


const UserController = {
    displayUser: function (req, res){
      //Get users DataBase
      userService.getById(req.params.id)
        .then((user) =>{
          if(user != null){
            return res.render(path.join(__dirname, '../views/users/userDetails.ejs'), {user: user});
          }
          else{
            return res.send("ERROR.\nUsuario no encontrado!")
          }
        })
        .catch((error) =>{
          console.log(error);
          res.send("ERROR.\nUsuario no encontrado!")
        });
          
    },

    displayUsersList: function(req, res){
        //Get all users from Database.
        userService.getAll()
          .then((users) => {
            res.render(path.join(__dirname, '../views/users/usersList.ejs'), {users: users});
          })
          .catch((error) => {
            console.log(error);
            res.send("ERROR.\nHa ocurrido un problema!")
          });
    }, 

    displayLogin: function(req, res){
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    },

    displayRegister: function(req, res){
      securityQuestionService.getAll()
        .then((securityQuestions) =>{
          res.render(path.join(__dirname, '../views/users/register.ejs'), {securityQuestions: securityQuestions });
        })
        .catch(() =>{
          res.send('ERROR!\nHa ocurrido un error, no podemos cargar esta vista :/');
        });
    },

    displayProfile: function(req, res){
        const user = req.session.loggedUser; 
        console.log(user.id);
        return res.redirect('/usuarios/' + user.id);
    },

    createUser: async (req, res) => {
      
      let errors = validationResult(req);

      const defaultUserCategory = "Usuario"

      const userCategory = await userCategoryService.getByName(defaultUserCategory);

      const userExistance = await userService.getByEmail(req.body.email.trim());

      if (errors.isEmpty()) {
        if(userExistance == null){
          let userData = {
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            gender: req.body.gender.trim(),
            telephone: req.body.telephone.trim(),
            email: req.body.email.trim(),
            password: bcrypt.hashSync(req.body.password.trim(), 10),
            securityQuestionId: req.body.securityQuestionId,
            securityAnswer: req.body.securityAnswer.trim().toLowerCase(),
            categoryId: userCategory.id,
            image:  req.file ? ('/' + req.file.filename) : "/default_profile_pic.png"
          }
        
          await userService.create(userData);

          return res.redirect('/usuarios/login');
        }
        else{
          securityQuestionService.getAll()
            .then((securityQuestions) =>{
              return res.render(path.join(__dirname, '../views/users/register.ejs'), 
              {
                securityQuestions: securityQuestions,
                errorMessages: [
                  {
                    msg: "El email ya se encuentra registrado!",
                    param: "email"
                  }
                ], 
                  old: req.body
              });
            });
        }
      } 
      else {
        securityQuestionService.getAll()
        .then((securityQuestions) =>{
          return res.render(path.join(__dirname, '../views/users/register.ejs'), 
          {
            securityQuestions: securityQuestions,
            errorMessages: errors.array(), 
            old: req.body
          });
        })
        .catch(() =>{
          return res.send('ERROR!\nHa ocurrido un error, no podemos cargar esta vista :/');
        });
      }

    },

    editUser: async function(req,res){
      try{
        //Get userId
        const userId = req.params.id;
      
        const user = await userService.getById(userId);

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
          image: req.file ? ("/" + req.file.filename) : user.image
        }

        //Get users DataBase
        await userService.edit(userId, newUserData);
        
        res.redirect('/usuarios/' + userId);
        
      }catch(error){
        console.log(error);
        res.send("Error.\nNo se han podido editar los datos del usuario!")
      }

    },

    deleteUser: async function(req, res){
      
      //search userToDelete
      const userToDelete = await userService.getById(req.params.id);
      
      //if the user id is different from logged user
      if(userToDelete.id != req.session.loggedUser.id){
        //Delete user from Database
        await userService.delete(userToDelete.id);
      }
      else{
        return res.send("No te puedes auto-eliminar!");
      }

      //Redirect to users list
      return res.redirect('/usuarios');
    },

    processLogin: async function(req, res) {
      //Get validation results
      let errors = validationResult(req);
      let userLoggingIn;
      
      //Checking validation errors
      if (errors.isEmpty()) {

        //Search user in Database using email
        const user = await userService.getByEmail(req.body.email)
        
        //decrypt password and compare
        if(bcrypt.compareSync(req.body.password, user.password)){
          
          userLoggingIn = user;
        }

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

        //If user is found then Save Session
        req.session.loggedUser = userLoggingIn;

        //Analayze rememberMe from form.
        if(req.body.rememberMe != undefined){

          //Save cookie, maxAge=24 Hs
          res.cookie('rememberMe', bcrypt.hashSync(userLoggingIn.password, 10), {maxAge: 3600000});

        }

        
          res.redirect('/'); 
      }
      //Validation has errors.
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