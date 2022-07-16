//@Author: Bautista

const db = require('../database/models');

const UserService = {
    getById: function(id){

        const user = db.User.findByPk(id,
            {
                include: ["UserCategory", "SecurityQuestion", "Cart"]
            }
            )
            .then((dbResponse) => {
                return dbResponse;
            })
            .catch((error) => {
                console.log(error);
            });
        
        return user;
    },
    getAll: async function(){
        try{
            const users = await db.User.findAll(
                {
                    include: ["UserCategory", "SecurityQuestion"]
                }
            );

            return users;

        } catch(error){
            console.log(error);
            console.log("Ha ocurrido un error!\nNo se han podido traer a todos los usuarios.")
        };
           
        
    },

    getByFirstName: function(firstName){
        const user = db.User.findOne({
                where:{
                    first_name: firstName
                }
            })
            .then((dbResponse) => {
                return dbResponse;
            })
            .catch((error) =>{
                console.log(error);
            })
    },

    getByEmail: async function(email){
        try{
            const user = await db.User.findOne({
                where:{
                    email: email
                }
            });

            return user;
        }
        catch(error){
            console.log(error);
            console.log("Error.\nNo se ha encontrado al usuario");
        }
    },
    create: async function(userData){
        try{
            let newUser = await db.User.create(
                {
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    gender: userData.gender,
                    telephone: userData.telephone,
                    email: userData.email,
                    password: userData.password,
                    security_question_id: userData.securityQuestionId,
                    security_answer: userData.securityAnswer,
                    image: userData.image,
                    category_id: userData.categoryId
                },
            );

            console.log("Successfully added new User into Database!");
            
            return newUser;

        } catch(error){         
            console.log(error);
            console.log("User creation error.");
        }
    },
    edit: async function(userId, userData){
        let editData = {
            first_name: userData.firstName,
            last_name: userData.lastName,
            address: userData.address,
            zip_code: userData.zipCode,
            city: userData.city,
            province: userData.province,
            gender: userData.gender,
            email: userData.email,
            password: userData.password,
            security_question_id: userData.securityQuestionId,
            security_answer: userData.securityAnswer,
            category_id: userData.categoryId
        }
    }
}

module.exports = UserService;
 
