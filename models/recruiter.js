const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const recruiterSchema = new Schema({
    username: String,
    email: String,
    mobile: String,
    location: String,
    company: String,
    gender: String
});

recruiterSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Recruiter', recruiterSchema);