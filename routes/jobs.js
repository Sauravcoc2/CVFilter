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

router.post('/jobs', isLoggedIn, async (req, res)=>{
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
        req.flash("success", "Job Successfully Created!!");
        res.redirect("/jobs/new")
    } catch (err) {
        req.flash("error", "Something Went Wrong!!");
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

router.get('/jobs/:id/interested', isLoggedIn, async(req, res)=>{
    const job = await Job.findById(req.params.id);
    const candidateIds = job.appliedcandidate;
    const candidates = [];
    for(var i = 0; i < candidateIds.length; i++) {
        var candidate = await User.findById(candidateIds[i]);
        candidates.push(candidate);
    }
    res.render('recruiter/interested', {candidates, job});
});

router.post('/jobs/:jid/select/:uid', isLoggedIn, async(req, res)=>{
    const job = await Job.findById(req.params.jid);
    const user = await User.findById(req.params.uid);
    let array = job.selectedcandidate;
    array.push(user);
    console.log(array);
    job.selectedcandidate = array;
    await job.save();
    req.flash("success", "Selected!!");
    res.redirect('/jobs/' + req.params.jid + '/interested');
});

router.post('/jobs/:jid/reject/:uid', isLoggedIn, async(req, res)=>{
    const job = await Job.findById(req.params.jid);
    const user = await User.findById(req.params.uid);
    let array = job.rejectedcandidate;
    array.push(user);
    console.log(array);
    job.rejectedcandidate = array;
    await job.save();
    req.flash("error", "Rejected!!");
    res.redirect('/jobs/' + req.params.jid + '/interested');
});

router.get('/jobs/:id/selected', async(req, res)=>{
    const job = await Job.findById(req.params.id);
    const candidateIds = job.selectedcandidate;
    const candidates = [];
    for(var i = 0; i < candidateIds.length; i++) {
        var candidate = await User.findById(candidateIds[i]);
        candidates.push(candidate);
    }
    res.render('recruiter/selected', {candidates, job});
});

module.exports = router;