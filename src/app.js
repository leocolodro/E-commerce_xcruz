//Express
const express = require('express');
const app = express();

//Method-override
const methodOverride = require('method-override');

//Morgan
const morgan = require('morgan');

//Path
const path = require('path');

//Server port
const port = 3030;

//Static Resources
app.use(express.static("public"));

//Middleware´s (Don´t touch)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(methodOverride("_method"));

//View Engine
app.set("view engine", "ejs");

/*+++++++++++++++ Main Router - requiere ++++++++++++++++++*/
const mainRouter = require(path.join(__dirname, '/routes/mainRouter.js'));

app.listen(process.env.PORT || port, ()=>{
    console.log("Server Status: Online");
});

//Main Router - invocation
app.use('/', mainRouter);




