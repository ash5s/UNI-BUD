// variable declarations
// const baseURL = 'http://localhost:';
// const baseURL = 'https://www.google.com/';
const baseURL = 'http://35.166.203.103:';
const port ="80";
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
        // saveCasesToLocalStorage(JSON.stringify(data))
        // ==========================================
        
        // and then loop through it after parsing it
        unibudCases = data;
        var counter = 0;// track or count the number of loops or iterations
        //home page loop through cases//
        unibudCases.forEach(function (unibudCase) {
            counter++;
            // this is the home page loop
            // for each case in the loop get business collection(data)
            // or table(data) using email inside the "unibudCase" object passed
            getBusiness(unibudCase, "home-section", counter)
        });
        

        // ==========================================

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
            counter = 0;
            // loop through array
            data.forEach(function (unibudSolution) {
                counter++;
                getStudent(unibudSolution, counter);
            });       
        })
}

// get student collection
function getStudent(unibudSolution,counter) { 

    // ajax post for posting data to the server
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url:  baseURL+ port +"/getStudent", 
        data:{unibudSolution:unibudSolution.solutionsEmail}
    }).done(function (data, statusText, xhrObj) {

        const solutionObject = {
            "counter": counter,
            "unibudSolution": unibudSolution,
            "solutionsEmail": data[0].solutionsEmail,
            "educationInstituteName": data[0].educationInstituteName,
            "description": data[0].description,
            "profileImage": data[0].profileImage,
            "dateTime": data[0].dateTime
        };

        let solutionsContainer = document.getElementById("solutions-container");
        solutionsContainer.innerHTML = solutionComponent(solutionObject);//solutions case

      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}


function getCase(id) { 
    
    // ajax post for posting data to the server
    $.ajax({
        
        method: "GET",
        contentType: "application/json; charset=utf-8", // important
        dataType : "json", 
        url: baseURL + port + "/getCase",
        data: {
            id: id,
        },
    }).done(function (data, statusText, xhrObj) {
        // save to local storage
        runSolutionsCase(data)
      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}

// =================================


// get business collection
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

// checks if student is logged in
function checkStudentStatus() {

    // ajax post for posting data to the server
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url:  baseURL+ port +"/checkStudentStatus", 
        data:{caseEmail:unibudCase.caseEmail}
    }).done(function (data, statusText, xhrObj) {
        
      }).fail(function(err) {
        //do something when something is wrong
    }).always(function() {
       //do  something whether request is ok or fail
    });
}


// set case ID in local storage to use in getting solutions
function setCaseId(id) {
    if (id) {/* save the current case ID in local staorage*/ localStorage.setItem("caseId", id) }
    checkSessionBeforeUpload(id)
}

// check session of user before upload
function checkSessionBeforeUpload(caseId) {

    var check = 1;
    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url: baseURL + port + "/checkIfSignedIn",
        data:{check:check},
        }).done(function( data, statusText, xhrObj) {
            
            // check if user is logged in
            if (data['loggedIn'] == "1") {

                if (userType == "business") {
                    // if business account go to upload section or window
                    app('uploadCase', 'placeholder');
                } else {
                    if (caseId) {
                        // if student account go to solutions upload section
                        app('uploadSolutions', 'placeholder');
                    } else {
                        app('home', 'placeholder');
                        content = `You must have a business account 
                        to upload a case!. if you wish to continue
                        with case uplaod, please signup for a business account`;
                        showModal(content,"placeholder");
                    }
                }
                
            } else {
                // sent the user back to the login section
                app('runLoginSignup', 'placeholder')
                sectionTracker("uploadCase")
            }
                          
        })
        
}

// submit the signup form
function submitSignupForm() {
    $("#signup-form").submit(function(e){
        // e.preventDefault();
        
    });
}

// uploads user data to the cloud server
function signup() {
    
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var email = $("#email").val();
    var password = $("#pass-word").val();
    var website = $("#website").val();
    var businessOrUniversityName = $("#business-or-university-name").val();
    var businessOrStudentAbout = $("#business-or-student-about").val();
    var country = $("#country").val();
    var city = $("#city").val();
    var suburb = $("#suburb").val();
    var streetAddress = $("#street-address").val();
    var postCode = $("#post-code").val();
    var userType = $("#user-type").val();

    // creat user object
    const retrievedObject = {
        "firstName": firstName,
        "lastName": lastName,
        "businessOrUniversityName": businessOrUniversityName,
        "businessOrStudentAbout":businessOrStudentAbout,
        "email": email,
        "password": password,
        "website": website,
        "country": country,
        "city": city,
        "suburb": suburb,
        "streetAddress": streetAddress,
        "postCode": postCode,
        "userType": userType
    };

    obj = retrievedObject;

            // ajax post for posting data to the server
            $.ajax({
                method: "POST",
                contentType: "application/json; charset=utf-8", // important
                dataType : "json",
                url:  baseURL+ port +"/postUserData", 
                data: JSON.stringify(obj)
            }).done(function (data, statusText, xhrObj) {
                // check user type
                if (userType == "business") {
                    // populate the business table or collection if business user
                    saveBusinessOnSignup(email)
                } else {
                    // populate the student table if ist a student
                    saveStudentOnSignup(email)
                }

              }).fail(function(err) {
                //do something when something is wrong
            }).always(function() {
               //do  something whether request is ok or fail
            });
      
}

// login the use by checking the credentials first
function login(){

    var email = $("#login-email").val();
    var password = $("#login-pass-word").val();

    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        jsonp: 'callback',
        url: baseURL + port + "/login",
        data:{email:email, password:password},
        }).done(function( data, statusText, xhrObj) {

            if (data['login'] == "1") {
                // set user type in local storage
                localStorage.setItem("userType", data['userType']);
                // make sure the user session was set by checking the user session after login
                checkSessionBeforeUpload(0)

            } else {
                content = "Wrong credentials please check your email or password";
                // showModal(content, "runLoginSignup");
                app('home', 'placeholder');
            }
                          
        }).error (function( xhr ) {
            alert( "Error: " + JSON.stringify(xhr) );
        }) // end ajax
}

// used to check jsonp data
function jsonpCallback(response){
    alert(JSON.stringify(response));
}

// save business on signup to prevent missing user data
function saveBusinessOnSignup(email) {

    // collect data from user form and populate the variables 
    var profileImage = "blank-profile-picture-g4d4723f16_640.png";
    var businessName = $("#business-or-university-name").val();
    var description = $("#business-or-student-about").val();
    
    // ajax call post the data to the business collection or document
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        url: baseURL + port + "/saveBusinessOnSignup",
        data: {
            profileImage: profileImage,
            businessName: businessName,
            description: description,
            email: email,
        },
    }).done(function (data, statusText, xhrObj) {

        if (data['uploaded'] == "1") {
            app('profile', 'placeholder');
            content = "Your profile has been updated";
            // showModal(content, "placeholder");
        } else {
            content = "You need to login to update your profile";
            showModal(content, "runLoginSignup");
                
        }
    });
    
}

// save business profile data
function saveBusiness() {
    
    // collect data from user form and populate the variables
    var profileImage = $("#temporarily-store-profile-image-name").val();
    var businessName = $("#business-organization-name").val();
    var description = $("#entity-description").val();

    // ajax call for posting data to the student collection
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType: "jsonp",
        url: baseURL + port + "/saveBusiness",
        data: {
            profileImage: profileImage,
            businessName: businessName,
            description: description,
        },
    }).done(function (data, statusText, xhrObj) {

        // check status of post
        if (data['uploaded'] == "1") {
            // keep the user on the same page
            app('profile', 'placeholder');
            // update the user of the upload through the app modal
            content = "Your profile has been updated";
            // open app modal
            showModal(content, "placeholder");
        } else {
            // send the user back to the login page
            content = "You need to login to update your profile";
            showModal(content, "runLoginSignup");
                
        }
    });
    
}

// save student on signup
function saveStudentOnSignup(email){

    // get data from the form and populate the variables 
    var profileImage = "blank-profile-picture-g4d4723f16_640.png";// use tem icon/image as placeholder berfore they updatet their profile
    var educationInstituteName = $("#business-or-university-name").val();
    var description = $("#business-or-student-about").val();

    // ajax call for getting data from atlas mongo database
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        url: baseURL + port + "/saveStudentOnSignup",
        data: {
            profileImage: profileImage,
            educationInstituteName: educationInstituteName,
            description: description,
            email:email,
        },
        }).done(function( data, statusText, xhrObj) {
            // check the upload status 
            if (data['uploaded'] == "1") {
                // if successful send the user to the home page
                app('home', 'placeholder');
                content = `Welcome to unibud you can now solve 
                the various cases on the platform and build your resume`;
                showModal(content,"placeholder");
            } else {
                // informs the user that they need to login to update profile
                content = "You need to login to update your profile";
                showModal(content,"runLoginSignup");
     
            }          
        })
}

// save student
function saveStudent(){

    // get data from the form and populate the variables 
    var profileImage = $("#temporarily-store-profile-image-name").val();
    var educationInstituteName = $("#education-institute-name").val();
    var description = $("#entity-description").val();

    // ajax call for upadting the student table
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8", // important
        dataType : "jsonp", 
        url: baseURL + port + "/saveStudent",
        data: {
            profileImage: profileImage,
            educationInstituteName: educationInstituteName,
            description: description
        },
        }).done(function( data, statusText, xhrObj) {
            // check status of upload 
            if (data['uploaded'] == "1") {
                // if successful keep the user on the profile page via app().
                app('profile', 'placeholder');
                // inform the user on the status of the upload
                content = "Your profile has been updated";
                showModal(content,"placeholder");
            } else {
                // send the user back to the login page
                content = "You need to login to update your profile";
                showModal(content,"runLoginSignup");
     
            }          
        })
}

// save case data to the case document or table
function saveCase(){

    // get the case id from local storahge
    caseId = localStorage.getItem("caseId");
    // get user type from local storage
    userType = localStorage.getItem("userType");
    // initiate userType variabel
    if (userType==null) {
        userType = "";
    } 

    // get data from form and populate the variables 
    var caseImage = $("#temporarily-store-case-image-name").val();
    var caseDescription = $("#case-description").val();
    var caseInstructions = $("#case-instructions").val();
    var repositoryLink = $("#repository-link").val();
    var caseFileUpload = $("#temporarily-store-case-file-name").val();
    
    // ajax call for saving the case data in the case document
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
            // when done check upload status 
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

// save student solution in the student table in the database
function saveSolution(){

    // get case ID fro local staorage
    caseId = localStorage.getItem("caseId");
    // get userType from local staorage
    userType = localStorage.getItem("userType");
    // initaite variabel
    if (userType==null) {
        userType = "";
    } 
    // get data from form and populate the variabels
    var caseImage = $("#temporarily-store-case-image-name").val();
    var caseDescription = $("#case-description").val();
    var caseInstructions = $("#case-instructions").val();
    var repositoryLink = $("#repository-link").val();
    var caseFileUpload = $("#temporarily-store-case-file-name").val();
    
    // ajax call for saving solution to solutions table
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
            // check status of upload
            if (data['uploaded'] == "1") {
                app('uploadSolutions', 'placeholder');
                // displays message to the user regarding the update
                content = "Congratulations!!! your solution has been uploaded";
                showModal(content, "placeholder");
                // rest for so that the fields are blank
                resetAllEntries(reloaderPage())
                
            } else {
                // send the user back to login
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
    // temporarily save case description
    caseUploadDescriptionTracker(caseDescription)
    // temporarily save repository link
    repositoryLink = $("#repository-link").val();
    caseRepositoryLinkTracker(repositoryLink)
    // temporarily save instructions
    caseInstructions = $("#case-instructions").val();
    caseUploadInstructionTracker(caseInstructions)
    uploadFile(formData);
}

function reloaderPage() {
    // location.reload();
}

// un set all entries after upload
function resetAllEntries(reloaderPage) {
    
    // unset all form entries
    $('#imageUpload').val("");
    $('#fileupload').val("");
    $('#case-description').val("");
    $('#case-instructions').val("");
    $('#repository-link').val("");
    
    // remove from local storage
    localStorage.removeItem("caseImageUpload");
    localStorage.removeItem("caseFileUpload");
    localStorage.removeItem("caseUploadDescription");
    localStorage.removeItem("caseUploadInstruction");
    localStorage.removeItem("caseRepositoryLink");

    // reload page
    reloaderPage();
}

// uploads all types of files therefore, images,docs,PDF and more
async function uploadFile(formData) {

    await fetch(baseURL + port + "/upload", {
        method: "POST",
        credentials: 'include',//for cross origin
        // credentials: false,//for cross origin
    body: formData
  }).then(function(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}).then(function(response) {
    console.log("ok");
    location.reload();
}).catch(function(error) {
    console.log(error);
});
}

// logout the user and reload the page
async function logOut() {

    let formData = new FormData(); 
    formData.append('logout', 1);
    await fetch(baseURL + port + "/logout", {
        method: "POST",
        credentials: 'include',//for cross origin
        body: formData
  }).then(response => {
      console.log(response);
      app('home','placeholder')
      location.reload();
});
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

