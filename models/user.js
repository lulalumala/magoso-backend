const mongoose = require("mongoose")

const UserInfo = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    country:{type:String},
    password: { type: String, required: true },
})
module.exports = mongoose.model("User", UserInfo)