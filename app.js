const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

//Express server port.
const port = 3030;

app.listen(port, () => {
    console.log("Server status: Online");
});

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "/views/home.html"))
// });

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, "/views/home.html"))
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, "/views/register.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, "/views/login.html"))
})

app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, "/views/cart.html"))
})

app.get('/product_detail', (req, res) => {
    res.sendFile(path.resolve(__dirname, "/views/productDetail.html"))
})