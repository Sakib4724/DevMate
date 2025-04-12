const express = require("express");
const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from DevMate Test!")
})

app.listen(3000, () => {
    console.log("DevMate Server is running on port 3000")
});