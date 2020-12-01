const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

/* GET URL Path /signup/.  */
router.get('/', function(req, res, next) {
  res.render('sign_up', { title: 'Sign Up Page' });
});

/** 
router.post('/', function(req, res, next) {
    var name = req.body.Name ;
    var username = req.body.Username ; 
    var password = req.body.Password ; 
    var trainee = req.body.Trainee ; 
    var trainer = req.body.Trainer ;
    var email = req.body.Email ;
    var bio = req.body.Bio ;
    
    //invalid input one of the fields is missing
    if(name.length == 0 || username.length == 0 || (trainer == null && trainee == null) || email.length == 0 || bio.length == 0){
        console.log("A required Parameter is missing");
        res.status(404).send("A required Parameter is missing");
    }
    //the password is not long enough 
    if(password.length < 6){
        console.log("Password must be at least 7 characters long ! ");
        res.status(404).send("Password must be at least 7 characters long !");
    }
    //input and password are accepted
    else{
        //usertype is a trainer
        if (trainee == null) {
            var TrainerObject = {
                Username: username, 
                Name: name,
                Email: email, 
                Password: password, 
                Bio: bio, 
                Experience: 0, 
                Trainees: {}
            }
            console.log(TrainerObject);
            const postedTrainer = new Trainer(TrainerObject);
            postedTrainer.save(function(err){
                if (err) {
                    return console.log(err);
                }
                else{
                    console.log("Trainer inserted succussfully!");
                    res.status(201).send();
                }
            });
        }
        //usertype is a trainee
        if (trainer == null) {
            var TraineeObject = {
                Username: username, 
                Name: name,
                Email: email, 
                Password: password, 
                Bio: bio, 
                Goals: "EDIT ME", 
                Trainers: {}
            }
            console.log(TraineeObject);
            const postedTrainee = new Trainee(TraineeObject);
            postedTrainee.save(function(err){
                if (err) {
                    return console.log(err);
                }
                else{
                    console.log("Trainee inserted succussfully!");
                    res.status(201).send();
                }
            });
        }
    }


  });
*/

module.exports = router;
