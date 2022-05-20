//Express
const express = require('express');
const app = express();

//Path
const path = require('path');

//Server port
const port = 3030;

//Static Resources
app.use(express.static("public"));

//Middleware´s (Don´t touch)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//View Engine
app.set("view engine", "ejs");

/*+++++++++++++++ Main Router - requiere ++++++++++++++++++*/
const mainRouter = require(path.join(__dirname, '/routes/mainRouter.js'));

app.listen(process.env.PORT || port, ()=>{
    console.log("Server Status: Online");
});

//Main Router - invocation
app.use('/', mainRouter);




