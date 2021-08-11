const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Job = require('../models/job');
const { isLoggedIn } = require("../utils/middleware");

//CREATE
router.get('/jobs/new', isLoggedIn, (req, res)=>{
    res.render('recruiter/new');
});

router.post('/jobs', async (req, res)=>{
    try {
        const recruiter = req.user._id;
        const user = await User.findById(recruiter);
        const company = user.company;
        const status = "active";
        const {jobtitle, language, location, ctc, lifespan} = req.body;
        const newJob = new Job({jobtitle, language, location, ctc, lifespan, company, status, recruiter});
        await newJob.save();
        await user.jobListByRecruiter.push(newJob._id);
        await user.save();
        res.redirect("/jobs/new")
    } catch (err) {
        res.send("Something went Wrong!!");
    }
});

router.get('/jobs/created', isLoggedIn, async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        const allDevelopers = user.jobListByRecruiter;
        const jobs = [];
        for(var i = 0; i < allDevelopers.length; i++) {
            var job = await Job.findById(allDevelopers[i]);
            jobs.push(job);
        }
        res.render('recruiter/created', {jobs});
    } catch (err) {
        res.redirect('/jobs/recruiter')
    }
});

router.get('/jobs/:id/interested', async(req, res)=>{
    const job = await Job.findById(req.params.id);
    const candidateIds = job.appliedcandidate;
    const candidates = [];
    for(var i = 0; i < candidateIds.length; i++) {
        var candidate = await User.findById(candidateIds[i]);
        candidates.push(candidate);
    }
    console.log(candidates);
    res.render('recruiter/interested', {candidates});
});

module.exports = router;
