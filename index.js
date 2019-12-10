//index js 
// Copy Right@11-19-2019 by peech B14 neverdie

var currNameIdGlobal;


window.onload=function(){

  
  initWeb();

}

function initWeb(){

  console.log("init index js");

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    $('#modalLoginForm').modal('hide');

    
    document.getElementById('modalLoginForm').style.display = "none";
    //$('#navbarDropdown').append(user.email);
    $('#navbarName').append(user.email);
    document.getElementById("BarbtnLogin").disabled = true;
    document.getElementById("navbarDropdown").disabled = false;
    document.getElementById("DownbtnLogout").disabled = false;
    document.getElementById("DownbtnAddnewCurr").disabled = false;
    //document.getElementById("BarbtnLogin").onclick = logout;
    //button addCourse and addMcourse show when user click curriculumID
    //move show in start function
    /*document.getElementById("btnShowaddcourse").style.visibility = "visible";
    document.getElementById("addCourseForm").style.display = "none";
    document.getElementById("btnShowaddMcourse").style.visibility = "visible";
    document.getElementById("addMCourseForm").style.display = "none";*/

    document.getElementById("btnShowaddcourse").style.visibility = "hidden";
    document.getElementById("addCourseForm").style.display = "none";
    document.getElementById("btnShowaddMcourse").style.visibility = "hidden";
    document.getElementById("addMCourseForm").style.display = "none";

    getCurrId();

    
    //temp1();

  }

  else{
    //no user

    



    $('#modalLoginForm').modal('show');
    $('#navbarName').append("");
    //add course form
    document.getElementById("btnShowaddcourse").style.visibility = "hidden";
    document.getElementById("addCourseForm").style.display = "none";

    //add Mcourse form
    document.getElementById("btnShowaddMcourse").style.visibility = "hidden";
    document.getElementById("addMCourseForm").style.display = "none";

    


    document.getElementById('modalLoginForm').style.display = "block";
    document.getElementById("BarbtnLogin").disabled = false;
    document.getElementById("navbarDropdown").disabled = true;
    document.getElementById("DownbtnLogout").disabled = true;
    document.getElementById("DownbtnAddnewCurr").disabled = true;
    //document.getElementById("ModalbtnSingUp").style.visibility = "hidden";
    //document.getElementById("btnChooseCurr").style.display = "disabled";
    console.log("No user go to login");

    
    

  }
  });


  
  




}





function login(){


  var Inputemail = document.getElementById('email_field').value;
  var Inputpass = document.getElementById('password_field').value;

  if(Inputemail.length<4){
    alert("input email please.");
    return;


  }

  if(Inputpass.length<4){
    alert("input password please.\n (at least 4 character)");
    return;

    
  }
  

  else{

    /*firebase.auth().signInWithEmailAndPassword(Inputemail, Inputpass)
    .catch(function(error) {
  // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') 
      {
      alert('Wrong password.');
      }   
      else 
      {
      alert(errorMessage);
      }
      console.log(error);
    }
    
    );*/
    

    //persistant support only web firebase cann't work in local
    //(for deploy only)



    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(Inputemail, Inputpass)
        .catch(function(error) {
      // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') 
          {
          alert('Wrong password.');
          }   
          else 
          {
          alert(errorMessage);
          }
          console.log(error);
        }
    
        );



    })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    

    firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
    // User is signed in.


      var fireBase_name = user.displayName;
      var fireBase_email = user.email;
 
      var fireBase_emailVerified = user.emailVerified;
      var fireBase_uid = user.uid;

      console.log(" "+fireBase_email+" "+ fireBase_uid);

      if(fireBase_email != null){

        

      

        console.log("go to index");
        //location.assign("file:///C:/Hosting/y/index.html");
      }




   }
   });


  }



  

}


function signUp(){


  

  var signuptemail = document.getElementById('SignUpemail_field').value;
  var signuppass = document.getElementById('SignUppassword_field').value;

  if(signuptemail.length<4){
    alert("input email please.");
    return;


  }

  if(signuppass.length<4){
    alert("input password please.\n (at least 4 character)");
    return;

    
  }

  secondaryApp.auth().createUserWithEmailAndPassword(signuptemail, signuppass).then(function(user){

    $('#modalSignUpForm').modal('hide');
    //document.getElementById('modalSignUpForm').stlye.display = "none";
    console.log("User " + user.uid + " created successfully!");
    alert("Add new admin is completed.")
    secondaryApp.auth().signOut();
    




  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...

  if(errorCode =='auth/email-already-in-use'){

    alert('Email already in use.');
  }
  else if(errorCode =='auth/invalid-email'){

    alert('invalid email.');


  }
  else{

    alert(errorMessage);
  }
  

});





  
}


function resetpass(){

  var Inputemail = document.getElementById('email_field').value;

  firebase.auth().sendPasswordResetEmail(Inputemail).then(function(){

    alert('password was send to your email');



  }).catch(function(error){

    var errorCode = error.code;
    var errorMessage = error.message;

    if(errorCode == 'auth/invalid-email'){

      alert(errorMessage);
     



    }
    else if(errorCode == 'auth/user-not-found'){

      alert(errorMessage);

    }



  });




}



function logout1(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.assign("https://project1-e118d.firebaseapp.com/welcome.html");
  //location.assign("file:///C:/Hosting/y/welcome.html")
  
}).catch(function(error) {
  // An error happened.
});


}


function deleteUser(){


  console.log("delete user");

  var user = firebase.auth().currentUser;

  console.log("delete "+user.email);

  user.delete().then(function(){

    alert('This user was deleted');
    location.assign("https://project1-e118d.firebaseapp.com/welcome.html");



  }).catch(function (){



  });





}

function reauthenticateDelete(){

  console.log("in reauthenticateDelete");

  var Inputemail = document.getElementById('ReauthenDeleteemail_field').value;
  var Inputpass = document.getElementById('ReauthenDeletepassword_field').value;
  var firebaseUser = firebase.auth().currentUser;



  secondaryApp.auth().signInWithEmailAndPassword(Inputemail, Inputpass).then(function(){

    console.log("pass");
    

    var secondUser = secondaryApp.auth().currentUser;

    console.log("firebaseUser.uid = "+firebaseUser.uid+" user.uid = "+secondUser.uid);

    if(firebaseUser.uid == secondUser.uid){

      console.log("true");

      secondaryApp.auth().signOut();

      // if secound = first then allow to delete user

      deleteUser();

      
    }
    else{

      console.log("false");

      secondaryApp.auth().signOut();

      
    }



  }).catch(function(error){

    console.log("error");

    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') 
      {
      alert('Wrong password.');
      //return false;
    }   
    else 
    {
      alert(errorMessage);
      //return false;
    }
    console.log(error);


  });


  



}


 

function start(currNameId){

  $("#Ccode").empty();
  $("#MCcode").empty();
  
  document.getElementById("btnShowaddcourse").style.visibility = "visible";
  document.getElementById("addCourseForm").style.display = "none";
  document.getElementById("btnShowaddMcourse").style.visibility = "visible";
  document.getElementById("addMCourseForm").style.display = "none";
  
  GeneralEducation(currNameId);
  MajorEducation(currNameId);
  


}





function GeneralEducation(currNameId){

  var fragment = document.createDocumentFragment();
  var table = document.createElement("table");
  var query = firebase.database().ref("ISNE/"+currNameId+"/Course/").orderByChild("Ccode");
  $(document).ready(function(){
  query.once("value").then(function(snapshot){
    var i = 1;  
    snapshot.forEach(function(childSnapshot){

      var trCode = childSnapshot.val().Ccode;
      var trValues = childSnapshot.val().Cname;
      var trCredit = childSnapshot.val().Ccredit;
      var trPrerequisite = childSnapshot.val().Cprerequisite;
      var trYear = childSnapshot.val().Cyear;
      var trSemester = childSnapshot.val().Csemester;
      //get key in db
      var trKey = childSnapshot.key;  

       $("#Ccode").append('<tr><th scope="row" id = "numRow">'+i+'</th><td id = "trCode">'+trCode+'</td><td>'+trValues+'</td><td>'+trCredit+'</td><td>'+trPrerequisite+'</td><td>'+trYear+'</td><td>'+trSemester+'</td><td><button id="btndel" name="Delete" onclick="CdeleteOnClick(\''+trKey+'\', \''+currNameId+'\')"> <i class="fas fa-trash-alt"></i></button></td></tr>');
    //}
    console.log(i);
      i++;

    });



  });
  });


}

function CdeleteOnClick(trKey,currNameId){


  console.log(trKey);


  $(document).ready(function(){

    var firebaseRef = firebase.database().ref("ISNE/"+currNameId+"/Course/"+trKey);

    var confirm1 = confirm("Are you sure to delete ? ");

       if(confirm1 == true){

          firebaseRef.remove().then(function(){
          console.log("Remove succeded");
          //re display #Ccdoe
          //if not the table of #Ccdoe will be duplicate (table1+table2)
          $("#Ccode").empty();
          //re display #Ccode
          GeneralEducation(currNameId);

          }).catch(function(error){

              console.log("Remove failed: "+error.message);

          })


        }
        else{


        }


  });
  

  
  
  /*var firebaseRef = firebase.database().ref("ISNE/"+currNameId+"/Course/"+trKey);
  firebaseRef.remove().then(function(){
    console.log("Remove succeded");
    //re display #Ccdoe
    //if not the table of #Ccdoe will be duplicate (table1+table2)
    $("#Ccode").empty();
    //re display #Ccode
    GeneralEducation(currNameId);

  }).catch(function(error){

    console.log("Remove failed: "+error.message);
  })*/
  

}


function MajorEducation(currNameId){


  var fragment = document.createDocumentFragment();
  var table = document.createElement("table");
  var query = firebase.database().ref("ISNE/"+currNameId+"/MajorCourse/").orderByChild("Ccode");

  $(document).ready(function(){
  query.once("value").then(function(snapshot){
    var i = 1;  
    snapshot.forEach(function(childSnapshot){

      var trCode = childSnapshot.val().Ccode;
      var trValues = childSnapshot.val().Cname;
      var trCredit = childSnapshot.val().Ccredit;
      var trPrerequisite = childSnapshot.val().Cprerequisite;
      var trYear = childSnapshot.val().Cyear;
      var trSemester = childSnapshot.val().Csemester;
      //get key in db
      var trKey = childSnapshot.key;  

       $("#MCcode").append('<tr><th scope="row">'+i+'</th><td>'+trCode+'</td><td>'+trValues+'</td><td>'+trCredit+'</td><td>'+trPrerequisite+'</td><td>'+trYear+'</td><td>'+trSemester+'</td><td><button id="btndel" name="Delete" onclick="MdeleteOnClick(\''+trKey+'\', \''+currNameId+'\')"> <i class="fas fa-trash-alt"></i></button></td></tr>');
    //}
    console.log(i);

      i++;


    });



});
});


}


function MdeleteOnClick(trKey, currNameId){

  console.log(trKey);

  $(document).ready(function(){

    var firebaseRef = firebase.database().ref("ISNE/"+currNameId+"/MajorCourse/"+trKey);

    var confirm1 = confirm("Are you sure to delete ? ");

       if(confirm1 == true){

          firebaseRef.remove().then(function(){
              console.log("Remove succeded");
              //re display #MCcdoe
              //if not the table of #Ccdoe will be duplicate (table1+table2)
              $("#MCcode").empty();
              //re display #MCcode
              MajorEducation(currNameId);

          }).catch(function(error){

              console.log("Remove failed: "+error.message);
          })


      }
      else{


      }


  });


  
 /* var firebaseRef = firebase.database().ref("ISNE/"+currNameId+"/MajorCourse/"+trKey);
  firebaseRef.remove().then(function(){
    console.log("Remove succeded");
    //re display #MCcdoe
    //if not the table of #Ccdoe will be duplicate (table1+table2)
    $("#MCcode").empty();
    //re display #MCcode
    MajorEducation(currNameId);

  }).catch(function(error){

    console.log("Remove failed: "+error.message);
  })*/
  




}


//add course section

function showAddCourse(){

  console.log("currNameIdGlobal :"+currNameIdGlobal);

  var addCourseForm = document.getElementById("addCourseForm");
  var btnShowaddcourse = document.getElementById("btnShowaddcourse");

  if(addCourseForm.style.display == "none"){
    addCourseForm.style.display = "block";
    btnShowaddcourse.textContent = "Hide";
  }
  else{
    addCourseForm.style.display = "none";
    btnShowaddcourse.textContent = "Add course";
  }


}


function addCourse(){

  console.log("currNameIdGlobaladdCourse :"+currNameIdGlobal);

  var addCcode = document.getElementById("addCcode").value;
  var addCname = document.getElementById("addCname").value;
  var addCcredit = document.getElementById("addCcredit").value;
  var addCprerequisite = document.getElementById("addCprerequisite").value;

  var addCyear = document.getElementById("addCyear").value;
  var addCsemester = document.getElementById("addCsemester").value;


  var intCheck = 1;
  
  //!check
  //null
  //undefined
  //NaN
  //empty string ("")
  //0
  //false

  //check input
  
  if(!addCcode || addCcode.length != 6){
    intCheck = 2;
    alert("รหัสวิชา ต้องมี 6 ตัวอักษร");
  }
  else if(!addCname){
    intCheck = 2;
    alert("กรุณากรอก ชื่อวิชา ");
  }


  else if(!addCcredit || addCcredit < 0){
    intCheck = 2;
    alert("เครดิต ต้องมากกว่าหรือเท่ากับ 0 ");
  }


  if(intCheck == 1){

    if(!addCprerequisite){
    addCprerequisite = "-";
    }
    if(!addCyear || addCyear <= 0){
      addCyear = "-";
    }
    if(!addCsemester || addCsemester <= 0){
      addCsemester = "-";
    }

    var firebaseRef=firebase.database().ref("ISNE/"+currNameIdGlobal+"/Course/");

    var newPostRef = firebaseRef.push({


      Ccode : addCcode,
      Cname : addCname,
      Ccredit : addCcredit,
      Cprerequisite : addCprerequisite,

      Cyear : addCyear,
      Csemester : addCsemester


    }, function(error){

      if(error){
        alert("Can't insert data.")
      }
      else{
        alert("data was inserted successfully.")

        $("#Ccode").empty();
        //re display #Ccode
        //
        document.getElementById("addCcode").value='';
        document.getElementById("addCname").value='';
        document.getElementById("addCcredit").value='';
        document.getElementById("addCprerequisite").value='';

        document.getElementById("addCyear").value='';
        document.getElementById("addCsemester").value='';


        GeneralEducation(currNameIdGlobal);

      }




    });

    var postId = newPostRef.key;

    console.log(postId+" "+" completed");

    



  }

  /*
  var firebaseRef=firebase.database().ref("ISNE/Course/");

  var newPostRef = firebaseRef.push({


    Ccode : addCcode,
    Cname : addCname,
    Ccredit : addCcredit,
    Cprerequisite : addCprerequisite

  }, function(error){

    if(error){
      alert("Can't insert data.")
    }
    else{
      alert("data was inserted successfully.")

      $("#Ccode").empty();
      //re display #Ccode
      GeneralEducation();

    }




  });

  var postId = newPostRef.key;

  console.log(postId+" "+" completed");
*/

}


//add Major course section


function showAddMCourse(){

  var addMCourseForm = document.getElementById("addMCourseForm");
  var btnShowaddMcourse = document.getElementById("btnShowaddMcourse");

  if(addMCourseForm.style.display == "none"){
    addMCourseForm.style.display = "block";
    btnShowaddMcourse.textContent = "Hide";
  }
  else{
    addMCourseForm.style.display = "none";
    btnShowaddMcourse.textContent = "Add course";
  }


}


function addMCourse(){

  console.log("currNameIdGlobaladdMCourse :"+currNameIdGlobal);

  var addMCcode = document.getElementById("addMCcode").value;
  var addMCname = document.getElementById("addMCname").value;
  var addMCcredit = document.getElementById("addMCcredit").value;
  var addMCprerequisite = document.getElementById("addMCprerequisite").value;

  var addMCyear = document.getElementById("addMCyear").value;
  var addMCsemester = document.getElementById("addMCsemester").value;

  var intCheck = 1;
  
  //!check
  //null
  //undefined
  //NaN
  //empty string ("")
  //0
  //false

  //check input
  
  if(!addMCcode || addMCcode.length != 6){
    intCheck = 2;
    alert("รหัสวิชา ต้องมี 6 ตัวอักษร");
  }
  else if(!addMCname){
    intCheck = 2;
    alert("กรุณากรอก ชื่อวิชา ");
  }


  else if(!addMCcredit || addMCcredit < 0){
    intCheck = 2;
    alert("เครดิต ต้องมากกว่าหรือเท่ากับ 0 ");
  }

  if(intCheck == 1){


    if(!addMCprerequisite){

      addMCprerequisite = "-";
    }
    if(!addMCyear || addMCyear <= 0){
      addMCyear = "-";
    }
    if(!addMCsemester || addMCsemester <= 0){

      addMCsemester = "-";
    }

    var firebaseRef=firebase.database().ref("ISNE/"+currNameIdGlobal+"/MajorCourse/");

    var newPostRef = firebaseRef.push({


      Ccode : addMCcode,
      Cname : addMCname,
      Ccredit : addMCcredit,
      Cprerequisite : addMCprerequisite,

      Cyear : addMCyear,
      Csemester : addMCsemester

    }, function(error){

      if(error){
        alert("Can't insert data.")
      }
      else{
        alert("data was inserted successfully.")

        $("#MCcode").empty();
        //re display #MCcode
        //
        
        document.getElementById("addMCcode").value='';
        document.getElementById("addMCname").value='';
        document.getElementById("addMCcredit").value='';
        document.getElementById("addMCprerequisite").value='';

        document.getElementById("addMCyear").value='';
        document.getElementById("addMCsemester").value='';


        MajorEducation(currNameIdGlobal);

      }




    });

    var postId = newPostRef.key;

    console.log(postId+" "+" completed");


  }





}


function addNewCurriculum(){

  var AddCurrNameId = document.getElementById("AddCurrNameId_field").value;
  var AddCurrName = document.getElementById("AddCurrName_field").value;
  var AddCurrMinCredit = document.getElementById("AddCurrMinCredit_field").value;
  var AddCurrId = document.getElementById("AddCurrId_field").value;

  var intCheck = 1;
  
  //!check
  //null
  //undefined
  //NaN
  //empty string ("")
  //0
  //false

  //check input
  
  if(!AddCurrNameId){
    intCheck = 2;
    alert("กรุณากรอก Curriculum ISNE year");
  }
  else if(!AddCurrName){
    intCheck = 2;
    alert("กรุณากรอก Curriculum name ");
  }


  else if(!AddCurrMinCredit || AddCurrMinCredit < 0){
    intCheck = 2;
    alert("เครดิตขั้นต่ำ ต้องมากกว่า 0 ");
  }
  else if(!AddCurrId || AddCurrId.length != 4){
    intCheck = 2;
    alert("Curriculum id จะต้องมี 4 ตัวเลข เช่น 0001,0002");


  }

  if(intCheck == 1){

    

    var firebaseRef=firebase.database().ref("ISNE/"+AddCurrNameId+"/Info/");

    var newPostRef = firebaseRef.push({

       Curriculumid : AddCurrId,
       Minimumcredit : AddCurrMinCredit,
       Name : AddCurrName




    }, function(error){


      if(error){
        alert("Can't insert data.")
      }
      else{

        alert("data was inserted successfully.")

        //
        
        document.getElementById("AddCurrNameId_field").value='';
        document.getElementById("AddCurrName_field").value='';
        document.getElementById("AddCurrMinCredit_field").value='';
        document.getElementById("AddCurrId_field").value='';

        

      }




    });

    var postId = newPostRef.key;

    console.log(postId+" "+" completed");


    

  }





}




//$("#MCcode").append('<tr><th scope="row">'+i+'</th><td>'+trCode+'</td><td>'+trValues+'</td><td>'+trCredit+'</td><td>'+trPrerequisite+'</td><td><button id="btndel" name="Delete" onclick="MdeleteOnClick(\''+trKey+'\')"> <i class="fas fa-trash-alt"></i></button></td></tr>');





function getCurrId(){

  console.log("getCurrId");
  var fragment = document.createDocumentFragment();

  var query = firebase.database().ref("ISNE");

  $(document).ready(function(){

    query.orderByKey().once("value").then(function(snapshot){
      var i = 1;  
      snapshot.forEach(function(childSnapshot){

        //TEST55, TEST60

        var currNameId = childSnapshot.key;

        


        getCurrName(currNameId,i);
        

        console.log("getCurrId"+i);
        i++;
      });


    });


  });



}

function getCurrName(currNameId,i){

   console.log("getCurrName");

  

  var query = firebase.database().ref("ISNE/"+currNameId+"/Info/");

  $(document).ready(function(){

    query.once("value").then(function(snapshot){
      
      snapshot.forEach(function(childSnapshot){

        var currName = childSnapshot.val().Name;
        var currId = childSnapshot.val().Curriculumid;
        var minimumCredit= childSnapshot.val().Minimumcredit;

        

        $("#currName").append('<h5><button class="dropdown-item" id="btnCurrName'+i+'" onclick="getCurrInfo(\''+currNameId+'\',\''+currName+'\', \''+currId+'\',\''+minimumCredit+'\')" >'+currName+'</button><div class="dropdown-divider"></div></h5>');

        
        



        console.log("getCurrName"+i);
        
      });



    });






  });




}




function getCurrInfo(currNameId, currName, currId, minimumCredit){

  console.log("getCurrInfo"+currNameId+currName+currId+minimumCredit);


  $(document).ready(function(){

    $("#headCurrName").empty();
    $("#headCurrName").append(''+currName+'');


    $("#Info").empty();
    $("#Info").append('<tr><td>'+currNameId+'</td><td>'+currId+'</td><td>'+minimumCredit+'</td></tr>');

    currNameIdGlobal = currNameId;
    start(currNameId); 


  });







}
/*
window.onload=function(){

  
  var firebaseRef = firebase.database().ref("ISNE/"+"Course").orderByKey();
  firebaseRef.once('value').then(function(dataSnapshot){
    dataSnapshot.forEach(function(childSnapshot){
      var childkey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childData.Ccode);


    })
    //console.log(dataSnapshot.val());
  });


}
*/



