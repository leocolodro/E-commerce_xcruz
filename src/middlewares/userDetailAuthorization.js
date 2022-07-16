//@Author: Bautista

function userDetailAuthorization (req, res, next){
    const loggedUser = req.session.loggedUser

    if(loggedUser == undefined){
        res.redirect("/usuarios/login");
    }
    else if(loggedUser.id != req.params.id && loggedUser.category == "Usuario"){
        res.redirect('/');
    }
    else{
        next()
    }
}

module.exports = userDetailAuthorization;