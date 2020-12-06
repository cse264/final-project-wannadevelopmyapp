
/*
 * This files holds all the code to test you REST API
 */



//Run once broswer has loaded everything
window.onload = function () {

console.log(document);
if(document.title == "home"){
  //button event for creating a profile 
  document.getElementById("create_profile").
  addEventListener("click", function(e){
    window.location.replace('https://trainer-atlas.herokuapp.com/complete_profile');
  });

  //button event for displaying a dog 
  document.getElementById("dog-image-btn").
  addEventListener("click", function(e){
    let req = new XMLHttpRequest();
    let url = new URL("https://random.dog/woof.json?ref=apilist.fun");
    req.open('GET', url);
    req.responseType = 'json';

    //call function when we get response
    req.onload = function (){
      //show/update dog image
      let image = this.response.url;
      document.getElementById("dog-image").setAttribute("src", image);
    };
    req.send();

  });

  //button event for deleting a profile 
  document.getElementById("delete_profile").
  addEventListener("click", function(e){
    //AJAX POST REQUEST 
    const deleteUser = async () => {
      const response = await fetch('https://trainer-atlas.herokuapp.com/home', {
        method: 'DELETE',
        //body: JSON.stringify(userObject), // string or object
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
  deleteUser();
  window.location.replace('https://trainer-atlas.herokuapp.com/');
  },false);

  //button event for logging out 
  document.getElementById("logout").
  addEventListener("click", function(e){
    window.location.replace('https://trainer-atlas.herokuapp.com/logout');
  });

  //button event for viewing profile 
  document.getElementById("view_profile").
  addEventListener("click", function(e){
    window.location.replace('https://trainer-atlas.herokuapp.com/profile_page');
  });
  
}
if(document.title == "complete_profile"){
  //when clicking the create profile button from signup page 
  document.getElementById("create_profile2").
  addEventListener("click", function(e){
    var Name = document.getElementById("users_name2").value;
    var Username = document.getElementById("username2").value;
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

    let userObject = {"Username": Username, "Name":Name, "UserType": UserType, "Experience":Experience, "Bio": Bio, "Goals": Goals}
    console.log(userObject)
    
    //AJAX PUT REQUEST 
    const editProf = async () => {
      const response = await fetch('https://trainer-atlas.herokuapp.com/complete_profile', {
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
  //PUT- /films
  editProf();
  //window.location.replace('https://trainer-atlas.herokuapp.com/home');
  },false);
  }

};