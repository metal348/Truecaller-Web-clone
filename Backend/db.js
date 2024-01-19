const mongoose = require("mongoose")
 mongoose.connect("mongodb+srv://metal348:malav123@cluster0.7oaobm8.mongodb.net/truecaller");
 const userDetailSchema = mongoose.Schema({
    Name : String,
    phone : String,
    city: String,
    State : String,
    simCompany: String
})

const userSchema = mongoose.Schema({
    phone : String,
    email : String,
    password : String
})

const userDetail = mongoose.model('userDetail',userDetailSchema);
const user = mongoose.model('users',userSchema);

module.exports = {userDetail,user}