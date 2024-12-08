const mongoose = require("mongoose");
// MongoDB Atlas URI for your cluster
const uri = "mongodb+srv://SidneyJohnson3911:Scj020421@usersdata.i3hw6.mongodb.net/Logintut?retryWrites=true&w=majority&appName=UsersData"

// Establish the connection
mongoose.connect(uri)
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
  }, { collection: 'IDKman' });

  const User = mongoose.model("IDKman", Loginschema);

  module.exports = User;

