
const User = require("./models/User");
const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate');
dotenv.config({ path: '.env' });

passport.serializeUser(function(user, done) {
    console.log("THE USER IS: " , user);
    done(null, user._json.email);
});
  
passport.deserializeUser(function(email, done) {
    console.log("THE USER'S EMAIL IS: " , email);
    // using callback
    User.findOne({ Email: email }, function (err, user) {
        done(err, user);});
});
  // index.js
  
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    //console.log(userProfile);
    const filter = {Email: userProfile._json.email}
    console.log(filter);
    User.countDocuments(filter,async function(err,count){
        if(err){console.log(err)}
        if(count==0){
          var UserObject = {
            Username: userProfile._json.email, 
            Name: userProfile._json.name, 
            Email: userProfile._json.email, 
            Bio: "N/A", 
            UserType: "N/A",
            Experience: 0 , 
            Goals: "N/A",
            Clients: {},

          };
          const addUser = new User(UserObject);
          addUser.save(function(err){
            if(err){
              return console.error(err);
            }
            else{
              console.log("Document inserted succussfully!");
            }
          });
              
        }
    });
    //console.log("THE GOODIES: " , userProfile._json)
    return done(null, userProfile);
}
));