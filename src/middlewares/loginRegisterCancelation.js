//@Author: Bautista

function loginRegisterCancelation (req, res, next){
    const loggedUser = req.session.loggedUser;

    if(loggedUser == undefined){
        next();
    }
    else {
        res.redirect('/usuarios/' + loggedUser.id);
    }
}

module.exports = loginRegisterCancelation;