//Author: Bautista.

//File System Module.
const fs = require('fs');

//Path Module.
const path = require('path');

//Users DataBase path 
const usersFilePath = path.join(__dirname, '../data/users-database.json');

//Users DataBase
const JsonUsersAnalyzer = {

    read: function() {
        //User DataBase
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //if array is empty, returns a default mockup
        if(users.length === 0){
            return [
                {
                    id: 1,
                    firstName: "Example",
                    lastName: "Example",
                    email: "example@gmail.com",
                    password:"example",
                    category:"Usuario",
                    image:"/default_profile_pic.png"
                }
            ];
        }
        //returns products array 
        else{
            return users;
        }
    },

    write(usersArray){
        //Transform to JSON.
		const newData = JSON.stringify(usersArray, null, "\t");

        //Write File.
		fs.writeFileSync(usersFilePath, newData, err => {
			
            // error checking
			if(err) throw err;

			console.log("New data written -> users-database");
		});  
    },

    create: function(newUser) {
        //Get products DataBase.
        let users = this.read();
        
        //Adds new product
        users.push(newUser);

        this.write(users);  
    },

    edit: function(userId, newUserData){
        //Get products DataBase.
        let users = this.read();
        
        //Search and edit user
        users.forEach(user => {
            if(user.id == userId){
                user.firstName = newUserData.firstName,
                user.lastName = newUserData.lastName,
                user.address = newUserData.address,
                user.zipCode = newUserData.zipCode,
                user.city = newUserData.city,
                user.province = newUserData.province,
                user.telephone= newUserData.telephone,
                user.gender = newUserData.gender,
                user.email = newUserData.email,
                user.password = newUserData.password,
                user.category = newUserData.category, 
                user.image = newUserData.image

            }});

        console.log("User #"+ userId +" has been edited -> users-database");
          
        //Write File.
        this.write(users);
    },

    /*+++++++++++++++TEST METHOD++++++++++++++++++*/
    delete: function(userId){
        //Get users from DataBase
        let users = this.read();
        
        //User profile pic folder path.
        const productImagesFolderPath = path.join(__dirname, '../../public/images/users/' + userId.toString());

        //Search and remove user.
        const usersFiltered = users.filter(user => {
            return user.id != userId
        });
   
        //Write File.
        this.write(usersFiltered);

		console.log("User #"+ userId, "has been deleted -> users-database");


        //Delete files & directory 
        
        fs.access(productImagesFolderPath, fs.F_OK, (err) => {
            if (!err) {
               
            fs.rmdir(productImagesFolderPath, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }   
                console.log(`${productImagesFolderPath} is deleted!`);
            });
              return
            }
            
            return
          });

        return
    }
}

module.exports = JsonUsersAnalyzer;