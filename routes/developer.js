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
    res.render('developer/home', { jobs });
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

    res.redirect('/developer');
});

module.exports = router;