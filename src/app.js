const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    //Creating a new instance of the user model
    const user = new User({
        firstName: "Sakib",
        lastName: "Shaikh",
        emailId: "sakibshaikh2425@gmail.com",
        password: "saki123"
    });

    try {
        await user.save();
        res.send("User added successfully!")
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

connectDB().then(() => {
    console.log("Database connection established..");

    app.listen(3000, () => {
        console.log("DevMate Server is running on port 3000")
    });
})
.catch(err => {
    console.log("Database cannot be connected!");
});