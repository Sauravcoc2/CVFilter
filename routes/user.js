const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Job = require('../models/job');
const { isLoggedIn } = require("../utils/middleware");

router.get('/registerDev', (req, res) => {
    res.render('registerDev');
});

router.get('/registerRec', (req, res) => {
    res.render('registerRec');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, password, email, mobile, location, gender, age, language, platform, company, type } = req.body;
        const user = new User({username, email, mobile, location, gender, age, language, platform, company, type});
        const registeredUser = await User.register(user, password);
        await registeredUser.save();
        req.flash("success", `Successfully Registered as ${user.type}!!`);
        res.redirect('/login');
    } catch (err) {
        res.redirect('/');
    }
}));

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) => {
    try {
        if(req.user.type == 'developer') {
            req.flash("success", "Successfully logged In as Developer!!");
            res.redirect('/developer');
        } else {
            req.flash("success", "Successfully logged In as Recruiter!!");
            res.redirect('/recruiter');
        }
    } catch (err) {
        req.flash("err", "Username or Password incorrect!!");
        res.redirect('/login');
    }
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/cvfilter');
})

module.exports = router;