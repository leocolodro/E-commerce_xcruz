//@Author: Bautista

/*this middleware is to restrict routes to not logged users*/
function userRoutes(req, res, next){
    const user = req.session.loggedUser;

    if(user == undefined){
        
        res.redirect("/usuarios/login");
    }
    else{
        next();
    }
}

module.exports = userRoutes;