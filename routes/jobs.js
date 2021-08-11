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

router.get('/jobs/createdjobs', async(req, res)=>{
    res.send("CREATED PAGE!!");
});

module.exports = router;
