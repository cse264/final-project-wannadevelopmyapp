
/*
 * This files holds all the code to test you REST API
 */



//Run once broswer has loaded everything
window.onload = function () {

console.log(document);
if(document.title == "home"){
  document.getElementById("create_profile").
  addEventListener("click", function(e){
    window.location.replace('http://localhost:3000/complete_profile');
  });
}
if(document.title == "complete_profile"){
  //when clicking the create profile button from signup page 
  document.getElementById("create_profile2").
  addEventListener("click", function(e){
    var Name = document.getElementById("users_name2").value;
    var Username = document.getElementById("username2").value;
    var Email = document.getElementById("email2").value;
    let UserType = null;
    let Experience = null;
    //radio buttons for User Type
    if (document.getElementById('Trainer_type2').checked) {
      UserType = "Trainer" ;
    }
    if (document.getElementById('Trainee_type2').checked) {
      UserType = "Trainee" 
    }
    //radio buttons for User Experience
    if (document.getElementById('experience1').checked) {
      Experience = "1" ;
    }
    if (document.getElementById('experience2').checked) {
      Experience = "2" ;
    }
    if (document.getElementById('experience3-5').checked) {
      Experience = "3-5" ;
    }
    if (document.getElementById('experience5+').checked) {
      Experience = "5<" ;
    }
    var Bio = document.getElementById("bio2").value;
    var Goals = document.getElementById("goals2").value;

    let userObject = {"Username": Username, "Name":Name, "Email":Email , "UserType": UserType, "Experience":Experience, "Bio": Bio, "Goals": Goals}
    console.log(userObject)
    
    //AJAX POST REQUEST 
    const addUser = async () => {
      const response = await fetch('http://localhost:3000/complete_profile', {
        method: 'PUT',
        body: JSON.stringify(userObject), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const file = await response ;
      //const myJson = await response.json(); //extract JSON from the http response
      // print response to console
      console.log(file);
    }
  //POST - /films
  addUser();
  //window.location.replace('http://localhost:3000/home');
  },false);
  }


/** 
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
*/  
/*
//when clicking the search bar to query for trainees on trainer homepage
document.getElementById("login").
addEventListener("click", function(e){});

//when clicking the search bar to query for trainers on trainee homepage
document.getElementById("login").
addEventListener("click", function(e){});
**/
};