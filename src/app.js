const express = require("express");
const app = express();

app.get("/user", (req, res) => {
    res.send("User data fetched successfully!")
});

app.post("/user", (req, res) => {
    res.send("User data saved to the database!")
});

app.delete("/user", (req, res) => {
    res.send("User data deleted from the database!")
});

app.listen(3000, () => {
    console.log("DevMate Server is running on port 3000")
});