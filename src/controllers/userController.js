const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const UserController = {

    displayLogin: function(req, res){
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    }, 

    displayRegister: function(req, res){
        res.render(path.join(__dirname, '../views/users/register.ejs'));
    },

     registro: function(req,res){
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },
    create: (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          image:  req.file ? req.file.filename : ''
        }
        let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/users-database.json'), {
          encoding: 'utf-8'
        });
        let users;
        if (archivoUsers == "") {
          users = [];
        } else {
          users = JSON.parse(archivoUsers);
        };
  
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/users-database.json'), usersJSON);
        res.redirect(path.resolve(__dirname, '../views/usuarios/login.ejs'));
      } else {
        
        return res.render(path.resolve(__dirname, '../views/usuarios/register.ejs'), {
          errors: errors.errors,  old: req.body
        });
      }
    }
  
}

//Export.
module.exports = UserController;