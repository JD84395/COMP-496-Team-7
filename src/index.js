const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./config");
//const Note = require("./Notes");


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



app.get("/", (req, res) => {
    res.render("Main"); // Renders the main page by default
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
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

        
        const newUser = new User({
            name: req.body.username,  
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log("User registered:", savedUser);

        // Redirect to login after successful signup
        res.redirect("/login");
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user.");
    }
});

// Login POST route
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name }); // Find the user by name
        if (!user) {
            return res.status(400).send("User not found");
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        // Redirect or respond with success
        res.status(200).send("Login successful");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Server error");
    }
});
/*app.get("/dashboard", async (req, res) => {
    try {
        const userId = req.query.userId; // Assume you get the user ID from session/cookie
        const notes = await Note.find({ userId });
        res.render("dashboard", { notes }); // Pass notes to the EJS dashboard view
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).send("Error fetching notes.");
    }
});

// Create a new note
app.post("/notes", async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const newNote = new Note({
            userId,
            title,
            content,
        });
        await newNote.save();
        res.status(201).send("Note created successfully.");
    } catch (err) {
        console.error("Error creating note:", err);
        res.status(500).send("Error creating note.");
    }
});

// Update a note
app.put("/Notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await Note.findByIdAndUpdate(id, { title, content });
        res.send("Note updated successfully.");
    } catch (err) {
        console.error("Error updating note:", err);
        res.status(500).send("Error updating note.");
    }
});

// Delete a note
app.delete("/Notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.send("Note deleted successfully.");
    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).send("Error deleting note.");
    }
});
*/
// A port to run application 
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
