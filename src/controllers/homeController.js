const path = require('path');

const HomeController = {
    home: function(req, res){
        console.log(__dirname);
        res.render(path.join(__dirname, '../views/home.ejs'));
    } ,

    /*detalleMenu: function(req, res){
        
        let plato = menu.find(element =>{
                               //Obtenemos la id del url del parametro del req
            return element.id ==  req.params.id;
        });

        if(plato == undefined){
            res.send(console.log("Plato no encontrado."));
        }
        else{
            res.render(path.join(__dirname, '../views/detalleMenu.ejs'), {platillo: plato});
        }
    }*/
}

module.exports = HomeController;