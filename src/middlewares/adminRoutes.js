//@Author: Bautista

/*this middleware is to restrict routes to user without "Administrador" category*/
function adminRoutes(req, res, next){
    const user = req.session.loggedUser;

    if(user == undefined){

        res.redirect("/usuarios/login");
    }   
    else if(user.category != "Administrador"){

        res.redirect("/");
    }
    else{
        next();
    }
}

module.exports = adminRoutes;