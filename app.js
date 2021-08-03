/**********************************************
CONSTANT VARIABLE DECLARATION
**********************************************/
const express = require("express");
const app = express();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const expressSanitizer = require("express-sanitizer");
const DataBaseConnect = require("./database/connection");
const passportLocalMongoose = require('passport-local-mongoose');

/**********************************************
APP CONFIGURATION
**********************************************/
//DataBase Connect
DataBaseConnect();
const Job = require('./models/job');
const User = require('./models/user');

//App Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(require('express-session')({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true
}))

//MIDDLEWARES
const { isLoggedIn } = require("./utils/middleware");
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



/*************ROUTER VARIABLES*************/
const user = require('./routes/user');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


/**********************************************
ROUTES
**********************************************/
app.get('/cvfilter', async (req, res)=>{
    res.send("CVFilter Index");
})

app.use('/', user);

app.listen(3000, ()=>{
    console.log("Server Started!!");
})