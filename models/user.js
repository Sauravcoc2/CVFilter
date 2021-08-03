const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    mobile: String,
    location: String,
    gender: String,
    age: Number,
    language: String,
    platform: String,
    company: String,
    type: {
        type: String,
        required: true
    },
    createdjob: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    appliedjob: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    candidate: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);