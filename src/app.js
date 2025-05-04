const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    //Creating a new instance of the user model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully!")
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({ emailId: userEmail });

        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        //const user = await User.findByIdAndDelete({ _id: userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "photoUrl", "about", "gender", "age", "skills"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills can not be more than 10");
        }

        //const user = await User.findByIdAndUpdate(userId, data);
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true });
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Failed to Update: " + err.message);
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
