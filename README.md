# Final Project

## Due Thursday, December 3, 2020

### Build a web app in a team of 5-6


### Final deliverable:
* Codebase in Github Repo
* README describing your project, with all of the information outlined above (team members, application name, description, etc). You will also include detailed instructions of how to install and run your application, and what API keys, databases, etc are needed to run your application. You will also provide a link to a live demo of your application.
* Final Presentation and Demo
  * You will prepare a 5 minute presentation and demo of your application in class during during a zoom call with me (time TBD)

### PROJECT SPECS

Application Name: 
Trainer Atlas

Members and Roles: 
William Ramundo, Tyler Hogue, Aidan Liston, 
Bratislav Petkovic, Thomas Perone, Ryan Palmer

Description:
App can be viewed at https://trainer-atlas-1.herokuapp.com/
This Node application was built by the use of express, mongoose and passport.js to setup login. The login is handled by Google Oauth 2.0. The outside API used can be viewed when the Dog button is clicked on the home page. Upon login, if the user's email is not found in the MongoDB, the user will be added with his/her fields filled in by "N/A". Upon arriving at the home page, the user will see 5 buttons :
 1. view profile: displays the signed in user's profile in the https://trainer-atlas-1.herokuapp.com/profile_page
 2. complete profile: displays a page where the user can complete his or her profile and submit it to mongoDB. https://trainer-atlas-1.herokuapp.com/complete_profile
 3. Delete Profile which deletes the user's profile and signs him/her out.
 4. Log Out button which logs the user out of the application. 
 5. The dog button. Click for suprise
 
 
