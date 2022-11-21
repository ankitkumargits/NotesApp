const mongoose = require("mongoose");


const ConnectToMongo  = ()=> {
    const dbUrl = "mongodb://127.0.0.1:27017/expnotes";
    mongoose.connect(dbUrl, ()=>{
        console.log("Your db is connected to the server");
    });
}

module.exports = ConnectToMongo;
