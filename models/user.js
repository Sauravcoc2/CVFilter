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
    result: String,
    type: String,
    result: String,
    appliedDateForDeveloper: {
        type: Date,
        default: Date.now
    },
    appliedJobsByDeveloper: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    jobListByRecruiter: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    candidateOfRecruiter: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);