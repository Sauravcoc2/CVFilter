const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Job = require('../models/job');
const { isLoggedIn } = require("../utils/middleware");

router.get('/developer', isLoggedIn, async (req, res) => {
    if(req.user.type == 'recruiter')
        res.redirect('/recruiter');
    const jobs = await Job.find({});
    const applied = [];
    jobs.forEach(job=>{
        if(job.appliedcandidate.includes(req.user._id)) {
            applied.push(job);
        }
    });
    res.render('developer/home', { jobs, applied });
});

router.post('/developer/:id/apply', isLoggedIn, async (req, res) => {
    const developer = await User.findById(req.user._id);
    const job = await Job.findById(req.params.id);
    const recruiter = await User.findById(job.recruiter);

    await developer.appliedJobsByDeveloper.push(job);
    await job.appliedcandidate.push(developer);
    await recruiter.candidateOfRecruiter.push(developer);

    await recruiter.save();
    await developer.save();
    await job.save();

    req.flash("success", "Successfully Applied!!");
    res.redirect('/developer');
});

router.post('/developer/:id/remove', isLoggedIn, async (req, res) => {
    const developer = await User.findById(req.user._id);
    const job = await Job.findById(req.params.id);

    let array = job.appliedcandidate;
    let index = array.indexOf(req.user._id);
    array.splice(index, 1);
    job.appliedcandidate = array;

    array = developer.appliedJobsByDeveloper;
    index = array.indexOf(req.params.id);
    array.splice(index, 1);
    developer.appliedJobsByDeveloper = array;

    await developer.save();
    await job.save();

    req.flash("error", "Unregistered!!");
    res.redirect('/developer');
});

module.exports = router;