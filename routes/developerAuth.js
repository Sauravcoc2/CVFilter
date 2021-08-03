const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Developer = require('../models/developer');

router.get('/developersignup', (req, res) => {
    res.render('developer/signup');
});

router.post('/developersignup', catchAsync(async (req, res, next) => {
    console.log(req);
    res.send("Testing");
    // try {
    //     console.log(req.body);
    //     const { username, password, email, mobile, location, gender, age, language, platform } = req.body;
    //     const user = new Developer({username, email, mobile, location, gender, age, language, platform});
    //     const registeredUser = await Developer.register(user, password);
    //     const newDeveloper = await registeredUser.save();
    //     const id = registeredUser._id;
    //     req.login(registeredUser, err => {
    //         if (err) return send("Login Failed!!");
    //         res.redirect('/login');
    //     })
    // } catch (e) {
    //     res.redirect('developer/signup');
    // }
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