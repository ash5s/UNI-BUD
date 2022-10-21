// variable declarations
// const baseURL = 'http://localhost:';
// const baseURL = 'https://www.google.com/';
const baseURL = 'http://127.0.0.1:';
const port ="3000";
let returnCloudData = [];

// get cases
function getCases() { 

    // ajax post for posting data to the server
    $.ajax({
        method: "GET",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/getCases", 
        data:{cases:1}
    }).done(function (data, statusText, xhrObj) {
        // save to local storage
        saveCasesToLocalStorage(JSON.stringify(data))
      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}

// get solutions
function getSolutions() { 

    caseId = localStorage.getItem("caseId");
    userType = localStorage.getItem("userType");
    if (userType==null) {
        userType = "";
    } 

    alert(caseId)
    var caseDescription = "test data ";

    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        // url: baseURL + port + "/saveSolutions",
        url: baseURL + port + "/retrieveSolutions",
        data: {
            caseId: caseId,
        },
        }).done(function( data, statusText, xhrObj) {

            alert('tetststs')
            // loop through array
            data.forEach(function (unibudSolution) {
                counter++;
                // get profile images and profile names
                let solutionsContainer = document.getElementById("solutions-container");
                // solutionsContainer.innerHTML = "wyeuruwv w rwerbvwevrbvnwebvre cghghf jhjghjgjh hjgjhjgjh hjgjhghjg hjgjhgjh hjghjghj hgjhghj";

                // alert(unibudSolution.solutionsEmail)
                
            
                // solutionsContainer.innerHTML = solutionComponent(unibudSolution);
                
            });


            // if (data['uploaded'] == "1") {
            //     app('uploadCase', 'placeholder');
            //     content = "Your case has been uploaded";
            //     showModal(content,"placeholder");
            // } else {
            //     content = "You need to login to upload a case";
            //     showModal(content,"runLoginSignup");
                
            // }          
        })
}


function getCase(userEmailId) { 

    // ajax post for posting data to the server
    $.ajax({
        method: "GET",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json",
        url:  baseURL+ port +"/getCase", 
        data:{email:userEmailId}
    }).done(function (data, statusText, xhrObj) {
        // save to local storage
        runSolutionsCase(data)
      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}


// get cases
function getBusiness(unibudCase,section,counter) { 

    
    // ajax post for posting data to the server
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url:  baseURL+ port +"/getBusiness", 
        data:{caseEmail:unibudCase.caseEmail}
    }).done(function (data, statusText, xhrObj) {
        // save to local storage
        
        // localStorage.setItem("businessEmail", data[0].businessEmail);
        // localStorage.setItem("businessName", data[0].businessName);
        // localStorage.setItem("businessDescription", data[0].description);
        // localStorage.setItem("businessProfileImage", data[0].profileImage);
        // localStorage.setItem("businessDateTime", data[0].dateTime);

        const caseObject = {
            "counter": counter,
            "unibudCase": unibudCase,
            "businessEmail": data[0].businessEmail,
            "businessName": data[0].businessName,
            "businessDescription": data[0].description,
            "businessProfileImage": data[0].profileImage,
            "businessDateTime": data[0].dateTime
        };

        if (section == 'home-section') {
            let homeSection = document.getElementById("home-section");
            homeSection.innerHTML += caseComponent(caseObject);/*display cases in main container*/
        } else {
            let solutionsSection = document.getElementById("solutions-section");
            solutionsSection.innerHTML = solutionsComponent(caseObject);//solutions case
            getSolutions();

        }

      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}



// check session
function checkSessionBeforeCaseUpload(id) {

    if (id) {
        // save the current case ID in local staorage
        localStorage.setItem("caseId", id);        
    }
            
    
    
    var check = 1;
    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        // crossDomain: false,
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url: baseURL + port + "/checkIfSignedIn",
        data:{check:check},
        }).done(function( data, statusText, xhrObj) {
            // jsonpCallback(data['login']);
            if (data['loggedIn'] == "1") {
                
                app('uploadCase','placeholder');
                // window.location.href = '/View/case-upload.html'; //relative to domain
            } else {
                
                app('runLoginSignup', 'placeholder')
                sectionTracker("uploadCase")
            }
                          
        }).error (function( xhr ) {
            alert( "Error: " + JSON.stringify(xhr) );
        }) // end ajax
}

function submitSignupForm() {
    $("#signup-form").submit(function(e){
        // e.preventDefault();
        
    });
}

// uploads product data to the cloud server
function signup() {
    

    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var nameOfOrganisation = $("#name-of-organisation").val();
    var email = $("#email").val();
    var password = $("#pass-word").val();
    var website = $("#website").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var suburb = $("#suburb").val();
    var streetAddress = $("#street-address").val();
    var postCode = $("#post-code").val();
    var userType = $("#user-type").val();

    // const retrievedObject = '{"pic":"../images/BREAD.jpeg","name":"Bread","price":"30","details":"Freshly baked bread","productCode":"120098364390553456"}';
    const retrievedObject = {
        "firstName": firstName,
        "lastName": lastName,
        "name-of-organisation": nameOfOrganisation,
        "email": email,
        "password": password,
        "website": website,
        "country": country,
        "city": city,
        "suburb": suburb,
        "street-address": streetAddress,
        "postCode": postCode,
        "userType": userType
    };
    // obj = JSON.parse(retrievedObject);
    obj = retrievedObject;

            // ajax post for posting data to the server
            $.ajax({
                method: "POST",
                contentType: "application/json; charset=utf-8", // important
                dataType : "json",
                url:  baseURL+ port +"/postUserData", 
                data: JSON.stringify(obj)
              }).done(function( data, statusText, xhrObj) {
                
              }).fail(function(err) {
                //do something when something is wrong
            }).always(function() {
               //do  something whether request is ok or fail
            });
      
            // deleteblocal storage once its uploaded
            if(i == localStorage.length){
                localStorage.clear();
            }
}

// Get and display data from atlas mongo database
function login(){

    var email = $("#login-email").val();
    var password = $("#login-pass-word").val();

    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        // crossDomain: false,
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        // crossDomain: true,
        jsonp: 'callback',
        // jsonpCallback: 'jsonpCallback',
        // jsonp: false,
        url: baseURL + port + "/login",
        data:{email:email, password:password},
        }).done(function( data, statusText, xhrObj) {

            if (data['login'] == "1") {
                // set user type in local storage
                localStorage.setItem("userType", data['userType']);
                // window.location.href = '/View/index.html'; //relative to domain
                app('uploadCase','placeholder');
            } else {

            }
                          
        }).error (function( xhr ) {
            alert( "Error: " + JSON.stringify(xhr) );
        }) // end ajax
}

function jsonpCallback(response){
    alert(JSON.stringify(response));
}

// save business profile data
function saveBusiness(){

    var profileImage = $("#temporarily-store-profile-image-name").val();
    var businessName = $("#business-organization-name").val();
    var description = $("#entity-description").val();

    localStorage.removeItem("profileImage");
    
    
    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        url: baseURL + port + "/saveBusiness",
        data: {
            profileImage: profileImage,
            businessName: businessName,
            description: description
        },
        }).done(function( data, statusText, xhrObj) {

            if (data['uploaded'] == "1") {
                app('profile', 'placeholder');
                content = "Your profile has been updated";
                showModal(content,"placeholder");
            } else {
                content = "You need to login to update your profile";
                showModal(content,"runLoginSignup");
                
            }          
        })
}



// Get and display data from atlas mongo database 
function saveCase(){

    caseId = localStorage.getItem("caseId");
    userType = localStorage.getItem("userType");
    if (userType==null) {
        userType = "";
    } 

    var caseImage = $("#temporarily-store-case-image-name").val();
    var caseDescription = $("#case-description").val();
    var caseInstructions = $("#case-instructions").val();
    var repositoryLink = $("#repository-link").val();
    var caseFileUpload = $("#temporarily-store-case-file-name").val();
    
    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        url: baseURL + port + "/saveCase",
        data: {
            caseImage: caseImage,
            caseDescription: caseDescription,
            caseInstructions: caseInstructions,
            caseFileUpload: caseFileUpload,
            repositoryLink: repositoryLink,
            userType: userType,
            caseId:caseId

        },
        }).done(function( data, statusText, xhrObj) {
            
            // jsonObj = JSON.stringify(data);// simple way to make global - there are other approaches
            // alert(jsonObj)
            // cloudData = JSON.parse(jsonObj)

            if (data['uploaded'] == "1") {
                app('uploadCase', 'placeholder');
                content = "Your case has been uploaded";
                showModal(content,"placeholder");
            } else {
                content = "You need to login to upload a case";
                showModal(content,"runLoginSignup");
                
            }          
        })
}

function saveSolution(){

    caseId = localStorage.getItem("caseId");
    userType = localStorage.getItem("userType");
    if (userType==null) {
        userType = "";
    } 

    var caseImage = $("#temporarily-store-case-image-name").val();
    var caseDescription = $("#case-description").val();
    var caseInstructions = $("#case-instructions").val();
    var repositoryLink = $("#repository-link").val();
    var caseFileUpload = $("#temporarily-store-case-file-name").val();
    
    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        url: baseURL + port + "/saveSolutions",
        data: {
            solutionsImage: caseImage,
            solutionsDescription: caseDescription,
            solutionsInstructions: caseInstructions,
            solutionsFileUpload: caseFileUpload,
            repositoryLink: repositoryLink,
            userType: userType,
            caseId:caseId

        },
        }).done(function( data, statusText, xhrObj) {
            
            // jsonObj = JSON.stringify(data);// simple way to make global - there are other approaches
            // alert(jsonObj)
            // cloudData = JSON.parse(jsonObj)

            if (data['uploaded'] == "1") {
                app('uploadCase', 'placeholder');
                content = "Your case has been uploaded";
                showModal(content,"placeholder");
            } else {
                content = "You need to login to upload a case";
                showModal(content,"runLoginSignup");
                
            }          
        })
}


// set profile image 
function setProfileIamge(e) {
    e.preventDefault()
    let formData = new FormData(); 
    formData.append("fileupload", entityProfileImage.files[0]);
    // teporarily save upload image
    
    profileImageTracker(entityProfileImage.files[0].name)
    uploadFile(formData);
}


// this gets and sets the file data from the file input
// in the upload image case form
function setIamgeCaseFile(e) {
    e.preventDefault()
    let formData = new FormData(); 
    formData.append("fileupload", imageUpload.files[0]);
    // teporarily save upload image
    caseImageUploadTracker(imageUpload.files[0].name)
    caseDescription = $("#case-description").val();
    caseUploadDescriptionTracker(caseDescription)
    // temporarily save repository link
    repositoryLink = $("#repository-link").val();
    caseRepositoryLinkTracker(repositoryLink)
    // temporarily save instructions
    caseInstructions = $("#case-instructions").val();
    caseUploadInstructionTracker(caseInstructions)
    uploadFile(formData);
}

// in the upload case form
function setCaseFile(e) {
    e.preventDefault()
    let formData = new FormData(); 
    formData.append("fileupload", fileupload.files[0]);
    caseDescription = $("#case-description").val();
    // teporarily save upload file
    caseFileUploadTracker(fileupload.files[0].name)
    caseUploadDescriptionTracker(caseDescription)
    // temporarily save repository link
    repositoryLink = $("#repository-link").val();
    caseRepositoryLinkTracker(repositoryLink)
    // temporarily save instructions
    caseInstructions = $("#case-instructions").val();
    caseUploadInstructionTracker(caseInstructions)
    uploadFile(formData);
    
}

// uploads all types of files therefor, images,docs,PDF and more
async function uploadFile(formData) {
    await fetch(baseURL + port + "/upload", {
        method: "POST",
        // credentials: "same-origin",//for non cross origin
        credentials: 'include',//for cross origin
    body: formData
  }).then(function(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}).then(function(response) {
    console.log("ok");
}).catch(function(error) {
    console.log(error);
});
}

// logout the user
async function logOut() {

    let formData = new FormData(); 
    formData.append('logout', 1);
    await fetch(baseURL + port + "/logout", {
        method: "POST",
        // credentials: "same-origin",//for non cross origin
        credentials: 'include',//for cross origin
        body: formData
  });
}


// Get and display data from atlas mongo database
function getData(){

    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json", 
        url: baseURL + port + "/getData",
        data: {email:'testing@testing'},
        }).done(function( data, statusText, xhrObj) {
            
            jsonObj = JSON.stringify(data);// simple way to make global - there are other approaches
            
            cloudData = JSON.parse(jsonObj)
            
            document.getElementById("cloud-data-mobile-card-cont").innerHTML = '';
            // loops through the products Array to display each product 
            for(var i = 0; i < cloudData.length; i++) {
                var obj = cloudData[i];
                
                // product card that displays each product
                document.getElementById("cloud-data-mobile-card-cont").innerHTML += `<div id="mobile-card" class="mobile-card"><div class="profile-pic-cont">
                <img class="profile-thumb-pic" src="${obj.pic}" alt="Product " >
                </div>
                <div class="profile-pic-details">
                    <div>Product Name: ${obj.name}</div>
                    <div>Price: $${obj.price}</div>
                    <div>Details: ${obj.details}</div>
                    <div>Product Code: ${obj.productCode}</div>
                </div></div>
                `;
            }
                          
        }).error (function( xhr ) {
            alert( "Error: " + JSON.stringify(xhr) );
        }) // end ajax

}



// deletes All cloud data in atlas
function deleteAllData(){
// delete all data from data base
$.ajax({
    url:  baseURL+ port +'/deleteData',
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
        
    }
});

}

