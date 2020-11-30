
/*
 * This files holds all the code to test you REST API
 */



//Run once broswer has loaded everything
window.onload = function () {

console.log(document);
if(document.title == "Login Page"){
  //when clicking the login button 
  document.getElementById("login").
  addEventListener("click", function(e){
    var Username = document.getElementById("Username").value;
    var Password = document.getElementById("Password").value;
    console.log("Username: ", Username ,"  Password: ", Password )
    //AJAX GET REQUEST 
    const getUser = async () => {
      const response = await fetch('http://localhost:3000/trainers', {
        method: 'GET',
        //body: JSON.stringify(filmObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(myJson);
    }
  //GET -- localhost:3000/
  getUser();
  },false);
  
  //when clicking the sign up button from login page 
  document.getElementById("sign_up").
  addEventListener("click", function(e){
    //AJAX GET REQUEST 
    const loadSignupPage = async () => {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'GET',
        //body: JSON.stringify(filmObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const file = await response ;
      //const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(file);
      window.location.replace(file.url);
    }
  //POST - /films
  loadSignupPage();
  },false);
  }

if(document.title == "Sign Up Page"){
  //when clicking the sign up button from signup page 
  document.getElementById("sign_up2").
  addEventListener("click", function(e){
    var Name = document.getElementById("users_name").value;
    var Username = document.getElementById("username2").value;
    var Password = document.getElementById("password2").value;
    var Email = document.getElementById("email2").value;
    let trainee = null; 
    let trainer = null;
    if (document.getElementById('Trainer_type2').checked) {
      trainer = document.getElementById('Trainer_type2').value;
      console.log(trainer);
    }
    if (document.getElementById('Trainee_type2').checked) {
      trainee = document.getElementById('Trainee_type2').value;
      console.log(trainee);
    }
    var Bio = document.getElementById("bio2").value;

    let userObject = {"Name":Name, "Username": Username, "Password": Password, "Email":Email , "Trainee": trainee, "Trainer": trainer, "Bio": Bio}
    console.log(userObject)
    
    //AJAX POST REQUEST 
    const signUserUp = async () => {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(userObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const file = await response ;
      //const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(file);
      window.location.replace(file.url);
    }
  //POST - /films
  signUserUp();
  },false);
  }

/*
//when clicking the search bar to query for trainees on trainer homepage
document.getElementById("login").
addEventListener("click", function(e){});

//when clicking the search bar to query for trainers on trainee homepage
document.getElementById("login").
addEventListener("click", function(e){});
**/
};