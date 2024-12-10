const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const Note = require("./Notes");
const User = require("./config");
const session = require('express-session');

const app = express();
// convert into json format 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/// use ejs as a view enigne
app.set('view engine', 'ejs');

/// static file for css sheet 
app.use(express.static("public"));
app.set('views', path.join(__dirname,'../views'));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic User'd Id
app.use(session({
    secret: 'jONbVux8M2hNr8eqjESVyKxUVfriAyej', // strong secret key
    resave: false,
    saveUninitialized: false,
}));


app.get("/", (req, res) => {
    res.render("Main"); // Renders the main page by default
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/dashboard", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login"); // Redirect to login if the user is not logged in
    }
    
    try {
        // Fetch notes for the logged in user
        const notes = await Note.find({ userId: req.session.userId });
        
        const existingContent = notes.length > 0 ? notes.map(note => JSON.parse(note.content)) : [{}];
        res.render("dashboard", {userId: req.session.userId, notes, existingContent});
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).send("Server error while fetching notes.");
    }
});



// Registure User 
app.post("/signup", async (req, res) => {
    try {

        const existingUser = await User.findOne({ name: req.body.username });
        if (existingUser) {
            return res.status(400).send("User already exists.");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        
        const newUser = new User({
            name: req.body.username,  
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log("User registered:", savedUser);

        // Redirect to login after successful signup
        res.redirect("/login"); // maybe captial L??
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user.");
    }
});

// Login POST route
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).send("User not found");
        }
         // given password to encrytped 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        // Store userID in session
        req.session.userId = user._id;
        res.redirect("/dashboard");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Server error");
    }
});


// notes and dashboard route 
app.post('/save-note', async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated.' });
    }

    try {
        // Create a new note instance
        const newNote = new Note({
            userId,
            title,
            content,
        });

        // Save the note to the database
        await newNote.save();

        res.status(201).json({ message: 'Note saved successfully!' });
    } catch (err) {
        console.error('Error saving note:', err);
        res.status(500).json({ error: 'Error saving note.' });
    }
});




// A port to run application 
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
