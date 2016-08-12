var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

//Setting up the user Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Adds passport local mongoose methods to the UserSchema
UserSchema.plugin(passportLocalMongoose);

//Setting up the User model
module.exports = mongoose.model("User", UserSchema); 