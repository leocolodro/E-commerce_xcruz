//@Author: Bautista

const userService = require('../services/UserService');

const bcrypt = require('bcryptjs');

async function accountRememberer (req, res, next){
    

    //Check if cookie exist in client and if session not
    if(req.cookies.rememberMe != undefined && req.session.loggedUser == undefined){
        
        let userLoggingIn;

        const users = await userService.getAll();
        //Search user
        for(let i = 0; i<users.length; i++){
            //decrypt and comapre data.
            if(bcrypt.compareSync(users[i].password, req.cookies.rememberMe)) {
                //Save user in session
                userLoggingIn = users[i];

                break;
            }
        }

        //Save Session
        req.session.loggedUser = userLoggingIn;
    }
    
    next();
}

module.exports = accountRememberer;