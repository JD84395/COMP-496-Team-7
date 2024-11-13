const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./config");

const app = express();
/// use ejs as a view enigne
app.set('view engine', 'ejs');

/// static file for css sheet 
app.use(express.static("public"));
app.set('views', path.join(__dirname,'../views'));

app.get("/",(req, res) => {
    res.render("login");
});

app.get("/signup", (req,res) =>{
    res.render("signup");
});

// A port to run application 
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
