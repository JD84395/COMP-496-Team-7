const mongoose = require("mongoose");
// MongoDB Atlas URI for your cluster
const uri = "mongodb+srv://SidneyJohnson3911:Scj020421@usersdata.i3hw6.mongodb.net/logintut?retryWrites=true&w=majority&appName=UsersData";

// Establish the connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Create Schema for the users
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model from the schema
const User = mongoose.model("User", Loginschema);

// Export the model to be used in other file modules.exports = User;