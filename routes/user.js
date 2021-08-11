const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Job = require('../models/job');
const { isLoggedIn } = require("../utils/middleware");

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, password, email, mobile, location, gender, age, language, platform, company, type } = req.body;
        const user = new User({username, email, mobile, location, gender, age, language, platform, company, type});
        const registeredUser = await User.register(user, password);
        await registeredUser.save();
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) => {
    if(req.user.type == 'developer') {
        res.redirect('/developer');
    } else {
        res.redirect('/recruiter');
    }
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/cvfilter');
})

module.exports = router;