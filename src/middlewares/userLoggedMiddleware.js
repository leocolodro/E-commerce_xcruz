function userLoggedMiddleware (req, res, next){
    const loggedUser = req.session.loggedUser;
    res.locals.isLogged = false;

    if(req.session && req.session.loggedUser){
        res.locals.isLogged = true;
    }

    next();
}

module.exports = userLoggedMiddleware;