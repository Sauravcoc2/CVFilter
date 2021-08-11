const mongoose=require("mongoose");
const Schema = mongoose.Schema;


const jobSchema = new Schema({
    jobtitle: String,
    company: String,
    language: String,
    location: String,
    ctc: Number,
    status: String,
    lifespan: Number,
    createddate: {
        type: Date,
        default: Date.now
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    appliedcandidate: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    selectedcandidate: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rejectedcandidate: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Job', jobSchema);