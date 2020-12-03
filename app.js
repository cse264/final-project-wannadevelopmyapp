var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');

//const cookieSession = require("cookie-session")
var findOrCreate = require('mongoose-findorcreate');
const passport = require('passport');
require('./passport-setup')
var userProfile;

var indexRouter = require('./routes/index');
var homeRoute = require('./routes/home');
var complete_profRouter = require('./routes/complete_profile')


//dotenv.config({ path: '.env.example' });
dotenv.config({ path: '.env' });

var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

//subject to change 
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

app.use(passport.initialize());
//tells the app to use sessions to authenthicate
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//app.get('/home', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

//app.use('/home', homeRoute);
/* GET URL Path /home/.  */
app.get('/home',isLoggedIn, async function(req,res,next){
  /** 
  //console.log(userProfile._json)
  //console.log(userProfile);
  //users: foundUsers
  const trainer_filter = {UserType : "Trainer"};
  const trainee_filter = {UserType : "Trainee"};
  let all_Trainers = await User.find(trainer_filter);
  let all_Trainees = await User.find(trainee_filter);
  let trainer_usernames = [];
  let trainee_usernames = [];
  for(let i=0; i < all_Trainers.length;i++){
    trainer_usernames.push(all_Trainers[i].Username)
  }
  for(let i=0; i < all_Trainees.length;i++){
    trainee_usernames.push(all_Trainees[i].Username)
  }
  console.log(trainer_usernames);
  console.log(trainee_usernames); */
  //trainers: trainer_usernames, trainees: trainee_usernames
  res.render('home', { title: 'home' });
});

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect to the home page.
    res.redirect('/home');
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Specifying Routes the App uses 
app.use('/', indexRouter);
app.use('/home', homeRoute);
app.use('/complete_profile', complete_profRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
