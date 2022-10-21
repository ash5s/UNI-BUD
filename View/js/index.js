// array
const unibudCasesxxx = [
    { "profileImage":"pexels-elvis-2528118.jpg", "businessName": "XYZ Marketing solutions", "time": "5 days ago", "caseFileName": "pexels-elvis-2528118.jpg", "instructions": "Menu not working properly" },
    { "profileImage": "pexels-elvis-2528118.jpg", "businessName": "XYZ Marketing solutions", "time": "5 days ago", "caseFileName": "pexels-elvis-2528118.jpg", "instructions": "Menu not working properly" },
    { "profileImage": "pexels-elvis-2528118.jpg", "businessName": "XYZ Marketing solutions", "time": "5 days ago", "caseFileName": "pexels-elvis-2528118.jpg", "instructions": "Menu not working properly" },
    { "profileImage": "pexels-elvis-2528118.jpg", "businessName": "XYZ Marketing solutions", "time": "5 days ago", "caseFileName": "pexels-elvis-2528118.jpg", "instructions": "Menu not working properly" }

];

// default temporal image before upload
var uploadCaseImage = localStorage.getItem("caseImageUpload");
if (uploadCaseImage == null) {
    uploadCaseImage = "/HD_transparent_picture.png";
}

// default temporal description before upload
var caseUploadDescription = localStorage.getItem("caseUploadDescription");
if (caseUploadDescription == null) {
    caseUploadDescription = "";
}

// default temporal repository link before upload 
var caseRepositoryLink = localStorage.getItem("caseRepositoryLink");
if (caseRepositoryLink == null) {
    caseRepositoryLink = "";
}

// default temporal file upload before upload
var caseFileUpload = localStorage.getItem("caseFileUpload");

if (caseFileUpload == null) {
    caseFileUpload = "";
} else {
    
}

// caseUploadInstruction
// default temporal file upload before upload
var caseUploadInstruction = localStorage.getItem("caseUploadInstruction");
if (caseUploadInstruction == null) {
    caseUploadInstruction = "";
} else {

}

// get temporal profile image
var profileImage = localStorage.getItem("profileImage");
if (profileImage == null) {
    profileImage = "mailchimp-0qnRfgnZIsI-unsplash.jpg";
} else {

}


var section = '';

$(document).ready(function () {

    // get user type upload-btn
    
    
    
    // getCase("test@test.com")

    appSection = localStorage.getItem("appSection");
    caseArr = localStorage.getItem("cases");

    if (appSection==null) {
        appSection = "home";
        sectionTracker(appSection)
    } else {

    }

    // get cases
    getCases();
    caseArr = localStorage.getItem("cases");
    data = JSON.parse(caseArr)
    // console.log(whichIsVisible(cloudData))
    
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        console.log(JSON.stringify(obj.caseEmail))
    }

    data.forEach(function (unibudCase) { 
        console.log(JSON.stringify(obj.caseEmail))
        console.log(JSON.stringify(unibudCase.caseImage))
        console.log(JSON.stringify(unibudCase.caseDescription))
        console.log(JSON.stringify(unibudCase.dateTime))
    });
        

    // let bannerWrapper = document.getElementById("banner-wrapper");
    let unibudApp = document.getElementById("unibud-app");
    // let homeSection = document.getElementById("home-section");
    let solutionsSection = document.getElementById("solutions-section");
    // let uploadCaseSection = document.getElementById("upload-case-section");
    let uploadSolutionsSection = document.getElementById("upload-solutions-section");
    // let footerWrapper = document.getElementById("footer-wrapper");

    // $(".upload-case-section").show();

    // app('home','placeholder')//instanciate the app
    app(appSection,'placeholder')//instanciate the app

});


// (bannerWrapper,homeSection,solutionsPage,uploadCasePage,uploadSolutionsPage,footerWrapper)

function app(section,data) {
    
    if (section != "runLoginSignup") {
        sectionTracker(section)
    }
    // app banner
    runBanner();
    // select what section of app to run at any given time
    switch (section) {
        case "home":
          //home section loop
            runHomeSection(data);
          break;
        case "solutions":
            runSolutions(data);
          break;
        case "uploadCase":
            runCaseUpload(data);
            break;
            case "profile":
                runProfile(data);
              break;
        case "uploadSolutions":
            runHomeSectionxx();
          break;
        case "runLoginSignup":
            runLoginSignup();
      }
    // app footer
    runFooter();
}

// save cloud data to local storage
function saveCasesToLocalStorage(cases) {
    localStorage.setItem("cases", cases);
}

// save cloud data to local storage
function saveProfileToLocalStorage(profile) {
    localStorage.setItem("profile", profile);
}

var nextSection = "";
// display model
function showModal(content, action) {
    nextSection = action;
    $(".app-modal").show();
    document.getElementById("inner-app-modal").innerHTML = content;
}

function sectionTracker(appSection) {
    // set section
    localStorage.setItem("appSection", appSection);//"sectinonName":"section value"
}

// profile image tracker
function profileImageTracker(imageName) {
    localStorage.setItem("profileImage", imageName);//"sectinonName":"section value"
}

// case image tracker
function caseImageUploadTracker(imageName) {
    localStorage.setItem("caseImageUpload", imageName);//"sectinonName":"section value"
}

// case image tracker
function caseFileUploadTracker(fileName) {
    localStorage.setItem("caseFileUpload", fileName);//"sectinonName":"section value"
}

// case description tracker
function caseUploadDescriptionTracker(description) {
    localStorage.setItem("caseUploadDescription", description);//"sectinonName":"section value"
}

// case instructions tracker
function caseUploadInstructionTracker(instructions) {
    localStorage.setItem("caseUploadInstruction", instructions);//"sectinonName":"section value"
}

// case repository link tracker
function caseRepositoryLinkTracker(repositoryLink) {
    localStorage.setItem("caseRepositoryLink", repositoryLink);//"sectinonName":"section value"
}

function hideShowSectionsAccordingly(hide, show) {

    // remove display flex from login-signup-wrapper so it can be set to display:none or hidden
    $("#login-signup-wrapper").removeClass("display-flex");
    $(".inner-app-sections").hide();// hide other windows
    $("#" + show).show();
}


function runHomeSection(sectionData) {

    hideShowSectionsAccordingly("placeholder",'home-section');//only show the home section
    // get home section element
    caseArr = localStorage.getItem("cases");
    const unibudCases = JSON.parse(caseArr)
    var counter = 0;
    //home page loop through cases//
    unibudCases.forEach(function (unibudCase) {
        counter++;
        // get profile images and profile names
        getBusiness(unibudCase,"home-section",counter)
    });
}


function runBanner() {
    let bannerWrapper = document.getElementById("banner-wrapper");
    bannerWrapper.innerHTML += bannerComponent();//banner
}

function runFooter() {
    let footerWrapper = document.getElementById("footer-wrapper");
    footerWrapper.innerHTML += footerComponent();//footer
}

function runCaseUpload() {
    hideShowSectionsAccordingly("placeholder",'upload-case-section');//only show the home section
    let uploadCaseSection = document.getElementById("upload-case-section");
    uploadCaseSection.innerHTML = caseUploadComponent();
    userType = localStorage.getItem("userType");
    if (userType == "student") {
        $(".case-upload-btn").hide();
    } else {
        $(".solutions-upload-btn").hide();
    }
}

function runProfile() {
    hideShowSectionsAccordingly("placeholder",'profile-section');//only show the home section
    let profileSection = document.getElementById("profile-section");
    profileSection.innerHTML = profileSectionComponent();//profile
}

function runSolutionsUpload() {
    hideShowSectionsAccordingly("placeholder",'upload-case-section');//only show the home section
    let uploadSolutionsSection = document.getElementById("upload-solutions-section");
    uploadSolutionsSection.innerHTML = solutionsUploadComponent();//footer
}

// run the individual case
function runSolutionsCase(caseObject) {
    solutions = "solutions-section";
    counter = 1;
    getBusiness(caseObject[0],solutions,counter)
}

// solutionsComponent
function runSolutions(userEmailId) {
    // get the clicked case
    getCase(userEmailId);
    // hide all the other sections and only show solutions section
    hideShowSectionsAccordingly("placeholder",'solutions-section');//only show the home section
}

function runLoginSignup() {
    
    hideShowSectionsAccordingly("placeholder", 'login-signup-wrapper');
    $("#login-signup-wrapper").addClass("display-flex");//so the loging container is center
    let loginSignupWrapper = document.getElementById("login-signup-wrapper");
    loginSignupWrapper.innerHTML = loginSignupComponent();//footer
}

// banner component
function bannerComponent() {
    return`<div class="banner">UNIBUD</div>`
}

// case component
function caseComponent(caseObject) {
    return `<div id="case-container${caseObject.counter}" class="case-container" onclick="transformIntoSolutionPage('${caseObject.businessEmail}')">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="../View/uploads/${caseObject.businessProfileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${caseObject.businessName}
                    </div>
                    <div class="date-posted">
                        ${String((caseObject.unibudCase.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="../View/uploads/${caseObject.unibudCase.caseImage}"></object>
            </div>
        <div class="case-instructions solution-">
            <span class="fixed-height case-subject">${caseObject.unibudCase.caseDescription }</span>
        </div>
    </div>`
}

function solutionsComponent(caseObject) {
    return`<div id="case-container xxxx" class="case-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="../View/uploads/xxxx"></object>
                    </div>
                    <div class="business-name">
                    
                    </div>
                    <div class="date-posted">
                        xxxxx
                    </div>
                </div>
                <object class="case-image" data="../View/uploads/xxxxx"></object>
            </div>
        <div class="case-instructions solutions-case-instructions" >
            <div id="solutions-case1" class="solutions-comments-wrapper" onclick="showDetails(${1})">
                <div class="solutions-comments-label">
                    Instructions
                </div>
                <div class="solutions-comments-icon">
                    <span class="material-icons">
                        unfold_more
                    </span>
                </div>
            </div>
            <div id="inner-instructions-container1" class="inner-instructions-container">
                xxxxx
            </div>
        </div>
        <div>
            <div class="upload-solutions-wrapper solutions-case-instructions">
                <div class="solutions-comments-wrapper">
                    <div class="solutions-comments-label solutions-label">
                        Solutions
                    </div>
                    <div class="upload-solution-btn-wrapper" onclick="checkSessionBeforeCaseUpload()">
                        <span>
                            Upload solution
                        </span>
                        <span class="material-icons">
                            add
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div id="solutions-container" class="solutions-container">
        xxxxx
        </div>
    </div>`
}

// ================================
function solutionsComponentxx(caseObject) {
    return`<div id="case-container${caseObject.counter}" class="case-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="../View/uploads/${caseObject.businessProfileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${caseObject.businessName}
                    </div>
                    <div class="date-posted">
                        ${String((caseObject.unibudCase.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="../View/uploads/${caseObject.unibudCase.caseImage}"></object>
            </div>
        <div class="case-instructions solutions-case-instructions" >
            <div id="solutions-case1" class="solutions-comments-wrapper" onclick="showDetails(${1})">
                <div class="solutions-comments-label">
                    Instructions
                </div>
                <div class="solutions-comments-icon">
                    <span class="material-icons">
                        unfold_more
                    </span>
                </div>
            </div>
            <div id="inner-instructions-container1" class="inner-instructions-container">
                ${caseObject.unibudCase.caseInstructions}
            </div>
        </div>
        <div>
            <div class="upload-solutions-wrapper solutions-case-instructions">
                <div class="solutions-comments-wrapper">
                    <div class="solutions-comments-label solutions-label">
                        Solutions
                    </div>
                    <div class="upload-solution-btn-wrapper" onclick="checkSessionBeforeCaseUpload(${caseObject.unibudCase.id})">
                        <span>
                            Upload solution
                        </span>
                        <span class="material-icons">
                            add
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div id="solutions-container" class="solutions-container">
        ${caseObject.counter}
        </div>
    </div>`
}
// ================================

function solutionComponent(caseObject) {
    return`<div id="case-container${caseObject.counter}" class="solution-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="../View/uploads/${caseObject.businessProfileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${caseObject.businessName}
                    </div>
                    <div class="date-posted">
                        ${String((caseObject.unibudCase.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="../View/uploads/${caseObject.unibudCase.caseImage}"></object>
            </div>
        <div class="solutions-instructions solutions-case-instructions">
            <div id="solutions-comments-wrapper" class="solutions-comments-wrapper">
                <div class="solutions-comments-label">
                    Comments
                </div>
                <div class="solutions-comments-icon">
                    <span class="material-icons">
                        unfold_more
                    </span>
                </div>
            </div>
            <div id="inner-instructions-container" class="inner-instructions-container">
                ${caseObject.unibudCase.caseInstructions}
            </div>
        </div>
    </div>`
}

function caseComponentXXX(unibudCase) {
    return`<div class="case-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="../View/uploads/${unibudCase.caseImage}"></object>
                    </div>
                    <div class="business-name">
                    ${unibudCase.profileName}
                    </div>
                    <div class="date-posted">
                        ${unibudCase.dateTime}
                    </div>
                </div>
                <object class="case-image" data="../View/uploads/${unibudCase.caseImage}"></object>
            </div>
        <div class="case-instructions">
            <span class="case-subject">${unibudCase.instructions}</span>
        </div>
    </div>`
}



function caseUploadComponent(unibudCase) {
    return `
    <form id="upload-case-form" method="Post" enctype="multipart/form-data">
        <div class="upload-case-container case-upload-image-cont case-container">
                <input class="upload-case-document upload-case-file-input case-image-video" type="file" name="imageUpload" id="imageUpload" onchange="setIamgeCaseFile(event)">
                <input type="hidden" id="temporarily-store-case-image-name" name="temporarily-store-case-image-name" value="">   
                <object class="case-image" data="../View/uploads/${uploadCaseImage}">
                    <span class="case-upload-image material-symbols-outlined">
                        center_focus_strong
                    </span>
                </object>        
                </div>
            <div class="upload-case-form-wrapper">
                    <textarea id="case-description"  rows="2" class="upload-styles case-description" name="case-description" placeholder="Describe the issue"></textarea>
                    <br>
                    <textarea id="case-instructions"  rows="3" class="upload-styles case-instructions" name="case-instructions" placeholder="What needs to be done?"></textarea>
                    
                    <input type="text" id="repository-link" class="upload-styles repository-link"  name="repository-link" value="" placeholder="Enter the project's repository link">
                    <br>
                    <div class="upload-styles case-file-upload-btn-wrapper">
                    <span class="upload-attach-icon material-icons">
                        attachment
                    </span> Attache a file: 
                    <input class="upload-case-document case-file-upload-btn" type="file" name="fileupload" id="fileupload" onchange="setCaseFile(event)">
                    <input type="hidden" id="temporarily-store-case-file-name" name="temporarily-store-case-file-name" value="">
                    </div>
                    <br>
                    <button type="button" name="upload-case" id="upload-btn" onclick="saveCase()" class="case-upload-btn btn btn-dark">Upload Case</button>
                    <button type="button" name="upload-case" id="upload-btn" onclick="saveSolution()" class="solutions-upload-btn btn btn-dark">Upload Solutions</button>
                    <div name="upload-case" onclick="logOut()" >logout</div>
            </div>
        </form>`;

}

function caseUploadComponentXXXXX(unibudCase) {
    return `
    <form id="upload-case-form" method="Post" enctype="multipart/form-data">
        <div class="upload-case-container case-upload-image-cont case-container">
                <input class="upload-case-document upload-case-file-input case-image-video" type="file" name="imageUpload" id="imageUpload" onchange="setIamgeCaseFile(event)">
                <input type="hidden" id="temporarily-store-case-image-name" name="temporarily-store-case-image-name" value="${uploadCaseImage}">   
                <object class="case-image" data="../View/uploads/${uploadCaseImage}">
                    <span class="case-upload-image material-symbols-outlined">
                        center_focus_strong
                    </span>
                </object>        
                </div>
            <div class="upload-case-form-wrapper">
                    <textarea id="case-description"  rows="2" class="upload-styles case-description" name="case-description" placeholder="Describe the issue">${caseUploadDescription}</textarea>
                    <br>
                    <textarea id="case-instructions"  rows="3" class="upload-styles case-instructions" name="case-instructions" placeholder="What needs to be done?">${caseUploadInstruction}</textarea>
                    
                    <input type="text" id="repository-link" class="upload-styles repository-link"  name="repository-link" value="${caseRepositoryLink}" placeholder="Enter the project's repository link">
                    <br>
                    <div class="upload-styles case-file-upload-btn-wrapper">
                    <span class="upload-attach-icon material-icons">
                        attachment
                    </span> Attache a file: ${caseFileUpload}
                    <input class="upload-case-document case-file-upload-btn" type="file" name="fileupload" id="fileupload" onchange="setCaseFile(event)">
                    <input type="hidden" id="temporarily-store-case-file-name" name="temporarily-store-case-file-name" value="${caseFileUpload}">
                    </div>
                    <br>
                    <button type="button" name="upload-case" id="upload-btn" onclick="saveCase()" class="case-upload-btn btn btn-dark">Upload Case</button>
                    <button type="button" name="upload-case" id="upload-btn" onclick="saveSolution()" class="solutions-upload-btn btn btn-dark">Upload Solutions</button>
                    <div name="upload-case" onclick="logOut()" >logout</div>
            </div>
        </form>`;

}

function solutionsUploadComponent(unibudCase) {
    return `
    <form id="upload-case-form" method="Post" enctype="multipart/form-data">
        <div class="upload-case-container case-upload-image-cont case-container">
                <input class="upload-case-document upload-case-file-input case-image-video" type="file" name="imageUpload" id="imageUpload" onchange="setIamgeCaseFile(event)">
                <input type="hidden" id="temporarily-store-case-image-name" name="temporarily-store-case-image-name" value="${uploadCaseImage}">   
                <object class="case-image" data="../View/uploads/${uploadCaseImage}">
                    <span class="case-upload-image material-symbols-outlined">
                        center_focus_strong
                    </span>
                </object>        
                </div>
            <div class="upload-case-form-wrapper">
                    <textarea id="case-description"  rows="2" class="upload-styles case-description" name="case-description" placeholder="Describe the issue">${caseUploadDescription}</textarea>
                    <br>
                    <textarea id="case-instructions"  rows="3" class="upload-styles case-instructions" name="case-instructions" placeholder="What needs to be done?">${caseUploadInstruction}</textarea>
                    
                    <input type="text" id="repository-link" class="upload-styles repository-link"  name="repository-link" value="${caseRepositoryLink}" placeholder="Enter the project's repository link">
                    <br>
                    <div class="upload-styles case-file-upload-btn-wrapper">
                    <span class="upload-attach-icon material-icons">
                        attachment
                    </span> Attache a file: ${caseFileUpload}
                    <input class="upload-case-document case-file-upload-btn" type="file" name="fileupload" id="fileupload" onchange="setCaseFile(event)">
                    <input type="hidden" id="temporarily-store-case-file-name" name="temporarily-store-case-file-name" value="${caseFileUpload}">
                    </div>
                    <br>
                    <button type="button" name="upload-case" onclick="saveCase()" class="btn btn-dark">Upload Case</button>
                    <div name="upload-case" onclick="logOut()" >logout</div>
            </div>
        </form>`;

}

function profileSectionComponent() {
    return `
    <div class="profile-banner">
        <div class="profile-pic">
        
        <object class="entity-profile-image" data="../View/uploads/${profileImage}"></object>
        <input class="entity-profile-pic" type="file" name="entityProfileImage" id="entityProfileImage" onchange="setProfileIamge(event)">
            <input type="hidden" id="temporarily-store-profile-image-name" name="temporarily-store-profile-image-name" value="${profileImage}"> 
        </div>
    </div>
    <div class="txt-inputs-wrapper">
        <br>
        <input type="text" id="business-organization-name" class="business-organization-name entity-profile-inputs upload-styles "  name="business-organization-name" value="" placeholder="Business organization name">
        <br>
        <input type="text" id="education-institute-name" class="education-institute-name entity-profile-inputs upload-styles "  name="education-institute-name" value="" placeholder="Education institute name">
        <br>
        <textarea id="entity-description"  rows="2" class="entity-profile-inputs upload-styles entity-description" name="entity-description" placeholder="Describe Your self or your business"></textarea>

        <div class="save-profile-wrapper">
        <button type="button" name="save-profile" onclick="saveBusiness()" class="save-profile btn btn-dark">Save profile</button>
        </div>
    </div>
    `
}

// app footer component
function footerComponent() {
    return`
    <div class="footer">
        <div class="footer-btns" onclick="app('home',{initialLoad:1})">
            <span class="material-icons">
                home
            </span></div>
        <div class="footer-btns">
            <span class="material-icons" onclick="checkSessionBeforeCaseUpload(0)">
                add
            </span>
        </div>
        <div class="footer-btns" onclick="app('profile',{initialLoad:1})" >
            <span class="material-icons">
                person
            </span>
        </div>

    </div>`
}

function loginSignupComponent() {
    return `
    <div class="login-input-container">
            <div>
                <div class="login-inputs login-container-label">Login</div>
                <input class="login-text-inputs login-inputs" type="text" id="login-email" name="login-email" placeholder="Enter your email"><br><br>
                <input class="login-text-inputs login-inputs" type="text" id="login-pass-word" name="login-pass-word" placeholder="Password"><br><br>
                <button class="login-inputs login-submit-btn" onclick="login()">Login</button>
                <br><br>
                <p class="hide-login-show-signup signup-link" onclick="openSignup()">Signup</p>
            </div>
        </div>
        <div  class="signup-input-container">
            <form id="signup-form" method="Post"  >
                <div class="signup-label" >Signup</div>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="first-name" name="first-name" value="" placeholder="First Name" required>
                <input class="login-text-inputs signup-inputs" type="text" id="last-name" name="last-name" value="" placeholder="Last Name" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="name-of-organisation" value="" name="name-of-organisation" placeholder="Name of Organisation" required>
                <input class="login-text-inputs signup-inputs" type="email" id="email" name="email" value="" placeholder="Email" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="password" id="pass-word" name="password" value="" placeholder="password" required>
                <input class="login-text-inputs signup-inputs" type="text" id="website" name="website" value="" placeholder="Website" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="country" name="country" value="" placeholder="Country" required>
                <input class="login-text-inputs signup-inputs" type="text" id="city" name="city" value="" placeholder="City" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="suburb" name="suburb" value="" placeholder="Suburb" required>
                <input class="login-text-inputs signup-inputs" type="text" id="street-address" value="" name="street-address" placeholder="Street Address" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="post-code" name="post-code" value="" placeholder="Post Code">
                <select class="login-text-inputs signup-inputs" name="user-type" id="user-type">
                <option value="student">Select account type </option>
                <option value="business">Business</option>
            <option value="student">Student</option>
        </select><br>
                <button class="login-text-inputs signup-btns left-margin signup-inputs" type="button" onclick="signup()">Signup</button>
                <button class="login-text-inputs signup-btns signup-inputs" type="button" onclick="openLogin()">Login</button>
                
              </form>
        </div>`;
}
