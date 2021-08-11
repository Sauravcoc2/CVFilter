const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Job = require('../models/job');
const { isLoggedIn } = require("../utils/middleware");

router.get('/recruiter', isLoggedIn, async (req, res) => {
    if(req.user.type == 'developer')
        res.redirect('/developer');
    res.render('recruiter/home');
})

module.exports = router;