//@Author: Bautista

const jsonUsersAnalyzer = require('../helpers/jsonUsersAnalyzer');
const bcrypt = require('bcryptjs');

function accountRememberer (req, res, next){
    next();

    //Check if cookie exist in client and if session not
    if(req.cookies.rememberMe != undefined && req.session.loggedUser == undefined){
        
        let userLoggingIn;

        const users = jsonUsersAnalyzer.read();
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
}

module.exports = accountRememberer;