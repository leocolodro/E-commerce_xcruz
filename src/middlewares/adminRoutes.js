//@Author: Bautista

//UserCategoryService require
const userCategoryService = require('../services/UserCategoryService.js');

/*this middleware is to restrict routes to user without "Administrador" category*/
async function adminRoutes(req, res, next){
    const user = req.session.loggedUser;
    const adminCategoryName = "Administrador"

    const adminCategory = await userCategoryService.getByName(adminCategoryName);

    if(user == undefined){

        res.redirect("/usuarios/login");
    }
    //"UserCategory (Database)" -> id = 2 = Administrador     
    else if(user.category_id != adminCategory.id){

        res.redirect("/");
    }
    else{
        next();
    }
}

module.exports = adminRoutes;