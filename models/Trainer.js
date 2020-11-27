const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trainerSchema = new mongoose.Schema({

//Place your Schema here

Username : {type:String, unique: true, required:[true, 'Please insert Usename']},         //Trainer Username
Name:   {type:String, required:[true, 'Please insert Name']},                             //Trainer Name
Email:    {type:String, required:[true, 'Please insert Email']},                          //Trainer Email 4 OAuth Purposes 
Bio:    {type:String, required:[true, 'Please insert Bio']},                              //Trainer Experience in Years 
Experience: {type:Number, unique: false},   
Trainees: [
    {                                                                                   //Past Trainees
        Username : {type:String, required:[true, 'Please insert Trainee Username']},    //Trainee Username
    }
]

});



const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
