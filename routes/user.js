const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const LocalStrategy = require('passport-local');
const expressSanitizer = require("express-sanitizer");
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', catchAsync(async (req, res, next) => {
    console.log(req.body);
    try {
        const { username, password, email, mobile, location, gender, age, language, platform, company, type } = req.body;
        const user = new User({username, email, mobile, location, gender, age, language, platform, company, type})
        const registeredUser = await User.register(user, password);
        const newUser = await registeredUser.save();
        const id = registeredUser._id;
        req.login(registeredUser, err => {
            if (err) return send("Login Failed!!");
            res.redirect('/login');
        })
    } catch (e) {
        res.redirect('/signup');
    }
}));

router.get('/login', (req, res) => {
    res.render('/login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) => {
    id = req.user._id;
    res.send("Logged In Successfully!!");
    // res.redirect(`/parents/${id}/child`);
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/cvfilter');
})

module.exports = router;