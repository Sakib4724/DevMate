const mongoose = require("mongoose");

const connectDB = async(req, res) => {
    await mongoose.connect("mongodb+srv://admin-sakib:MeraMongoDBAtlas@cluster0.k0x6s.mongodb.net/devMate");  
};

module.exports = connectDB;

