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
        //Products DataBase
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //if array is empty, returns a default mockup
        if(users.length === 0){
            return [
                {
                    id: 1,
                    first_name: "Example",
                    last_name: "Example",
                    email: "example@gmail.com",
                    password:"example",
                    category:"user",
                    image:"/default_profile_pic.png"
                }
            ];
        }
        //returns products array 
        else{
            return users;
        }
    },

    write: function(newUser) {
        //Get products DataBase.
        let users = this.read();
        
        //Adds new product
        users.push(newUser);

        //Transform to JSON.
		const newData = JSON.stringify(users, null, "\t");

        //Write File.
		fs.writeFile(usersFilePath, newData, err => {
			
            // error checking
			if(err) throw err;

			console.log("New data added -> users-database");
		});  
    },

    edit: function(oldProduct, newProduct){
        //Get products DataBase.
        let users = this.read();

        //Get index of old product
        const index = products.findIndex(object => {
            return object.id === oldProduct.id;
          });
        
        //Remove product
        products.splice(index, 1);

        //Transform to JSON.
		const newData = JSON.stringify(products);
          
        //Write File.
        this.write(newProduct);
    },

    /*+++++++++++++++TEST METHOD++++++++++++++++++*/
    delete: function(product){
        let products = this.read();

        const index = products.findIndex(object => {
            return object.id === product.id;
          });

        products.splice(index, 1);

        //Transform to JSON.
		const newData = JSON.stringify(products);
          
        //Write File.
		fs.writeFile(productsFilePath, newData, err => {
			
            // error checking
			if(err) throw err;

			console.log("product", product.titulo ,"has been deleted -> products-database");
		});
    }
}

module.exports = JsonUsersAnalyzer;