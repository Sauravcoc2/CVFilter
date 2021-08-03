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
const Developer = require('./models/developer');
const Recruiter = require('./models/recruiter');

//App Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// app.use(require('express-session')({
//     secret: process.env.EXPRESS_SECRET,
//     resave: false,
//     saveUninitialized: true
// }))

//MIDDLEWARES
// const { isLoggedIn } = require("./utils/middleware");
// const recruiter = require("./models/recruiter");
// app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(Recruiter.authenticate()));
// passport.serializeUser(Recruiter.serializeUser());
// passport.deserializeUser(Recruiter.deserializeUser());

// passport.use(new LocalStrategy(Developer.authenticate()));
// passport.serializeUser(Developer.serializeUser());
// passport.deserializeUser(Developer.deserializeUser());

/*************ROUTER VARIABLES*************/
// const developer = require('./routes/developerAuth');

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     next();
// })


/**********************************************
ROUTES
**********************************************/
app.get('/cvfilter', async (req, res)=>{
    // const newRecruiter = new Recruiter({
    //     "username": "Sauav",
    //     "email": "sauravcoc2@gmail.com",
    //     "mobile": 999999999,
    //     "location": "Varanasi",
    //     "company": "Marvel",
    //     "gender": "Mutant"
    // });
    // await newRecruiter.save();
    // console.log("Saved!");
    res.send("CVFilter Index");
})

app.get('/developersignup', (req, res) => {
    res.render('developer/signup');
});

app.post('/developersignup', async (req, res, next) => {
    console.log(req.body);
    res.send("Testing");
    // try {
    //     console.log(req.body);
    //     const { username, password, email, mobile, location, gender, age, language, platform } = req.body;
    //     const user = new Developer({username, email, mobile, location, gender, age, language, platform});
    //     const registeredUser = await Developer.register(developerAuth, password);
    //     const newDeveloper = await registeredUser.save();
    //     const id = registeredUser._id;
    //     req.login(registeredUser, err => {
    //         if (err) return send("Login Failed!!");
    //         res.redirect('/login');
    //     })
    // } catch (e) {
    //     res.redirect('developer/signup');
    // }
});


// app.use('/', developer);

app.listen(3000, ()=>{
    console.log("Server Started!!");
})