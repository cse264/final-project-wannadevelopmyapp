const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const traineeSchema = new mongoose.Schema({

//Place your Schema here

Username : {type:String, unique: true, required:[true, 'Please insert Usename']},         //Trainee Username
Name:      {type:String, required:[true, 'Please insert Name']},                          //Trainee Name
Email:     {type:String, required:[true, 'Please insert Email']},                         //Trainee Email 4 OAuth Purposes 
Bio:       {type:String, required:[true, 'Please insert Bio']},                           //Trainee Experience in Years 
Goals:     {type:String, unique: false},   
Trainers: [
    {                                                                                     //Past Trainers
        Username : {type:String, required:[true, 'Please insert Trainer Username']},      //Trainer usernames 
    }
]

});



const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = Film;
