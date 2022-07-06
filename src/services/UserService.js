
const db = require('../database/models');

const UserService = {
    getById: function(id){

        const user = db.Users.findByPk(id,
            {
                include: [
                    {association: "User_Category"},
                    {association: "Security_Question"},
                    {association: "Cart"}
                
                ]
            })
            .then((dbResponse) => {
                return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });

        return user;
    }  
}

module.exports = UserService;
 
