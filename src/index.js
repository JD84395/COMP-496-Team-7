const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./config");

const app = express();
// convert into json format 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/// use ejs as a view enigne
app.set('view engine', 'ejs');

/// static file for css sheet 
app.use(express.static("public"));
app.set('views', path.join(__dirname,'../views'));
//app.set('public', path.join(__dirname,'../public'));


app.get("/", (req, res) => {
    res.render("Main"); // Renders the main page by default
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


// Registure User 
app.post("/signup", async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ name: req.body.username });
        if (existingUser) {
            return res.status(400).send("User already exists.");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user instance
        const newUser = new User({
            name: req.body.username,  // Ensure this matches the form field name
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log("User registered:", savedUser);

        res.redirect("/login");

        // Send success response with user details
        res.status(201).send({ message: "User registered successfully", user: savedUser });
    } catch (err) {
        console.error("Error registering user:", err);

        // Send error response
        res.status(500).send("Error registering user.");
    }
});


// A port to run application 
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
