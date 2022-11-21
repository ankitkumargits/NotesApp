const mongoose = require("mongoose");

const userRegSchema = new mongoose.Schema({
    email: String,
    password: String
});

const UserReg = mongoose.model('userreg', userRegSchema);


module.exports = UserReg;