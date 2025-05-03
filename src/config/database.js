const mongoose = require("mongoose");

const connectDB = async(req, res) => {
    await mongoose.connect(process.env.MONGODB_URI);  
};

module.exports = connectDB;
