//@Author: Bautista

/*-------------------------------SERVICES----------------------------------*/
const userService = require('../../services/UserService.js');
/*-------------------------------------------------------------------------*/


const userApiController = {

    listAll: async function(req, res){
        try {
            //Get all users from Database
            const users = await userService.getAll();
            
            //Get hostname
            const hostname = req.headers.host;

            //Filter user data
            let processedData = 
                users.map(user => {
                    return(
                        {
                            id: user.id,
                            email: user.email,
                            name: (user.first_name + " " + user.last_name),
                            detail: ('http://' + hostname + "/api/usuarios/" + user.id)
                        }
                    )
                });
            
            //send data.
            res.status(200).json(
                {
                    msg: "OK",
                    status: 200,
                    count: users.length,
                    data: processedData
                }
            );
        }
        catch(error){
            res.status(404).send({msg: "ERROR", status: 404})
            console.log(error);
        }
    },
    
    listOne: async function(req, res){
        try{
            //Get user from Database
            const user = await userService.getById(req.params.id);
            
            //Get hostname
            const hostname = req.headers.host;

            //Filter user data.
            const processedData = {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                gender: user.gender,
                province: user.province,
                city: user.city,
                zipCode: user.zip_code,
                address: user.address,
                telephone: user.telephone,
                image: 'http://' + hostname + "/images/users" + user.image
                }
            
            //send data.
            res.status(200).json(
                {
                    msg: "OK",
                    status: 200,
                    data: processedData
                }
            );
            
        }
        catch(error){
            res.status(404).send({msg: "ERROR", status: 404})
            console.log(error);
        }
        
    }

}

module.exports = userApiController;