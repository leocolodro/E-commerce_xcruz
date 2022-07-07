
const db = require('../database/models');

const UserService = {
    getById: function(id){

        const user = db.User.findByPk(id)
            .then((dbResponse) => {
                console.log(dbResponse);
            })
            .catch((error) => {
                console.log(error);
            });

        return user;
    },
    getAll: function(){
        const users = db.User.findAll(
            {
               include: "UserCategory"
            }
        )
            .then((dbResponse) => {
                console.log(JSON.stringify(dbResponse, null, "\t"));
             })
            .catch((error) => {
                console.log(error);
            });
           
        return users;
    },

    getByFirstName: function(firstName){
        const user = db.User.findOne({
                where:{
                    FIRST_NAME: firstName
                }
            })
            .then((dbResponse) => {
                return dbResponse
            })
            .catch((error) =>{
                console.log(error);
            })
    },

}

module.exports = UserService;
 
