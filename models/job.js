const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const jobSchema = new Schema({
    title: String,
    company: String,
    language: String,
    location: String,
    ctc: Number,
    status: String,
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    appliedcandidate: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

jobSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Job', jobSchema);