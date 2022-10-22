// array used for testing during development
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

// initiate the section variabel
var section = '';
$(document).ready(function () {

    // get user type upload-btn
    userType = localStorage.getItem("userType");
    // get the current section(page) of the app runing
    appSection = localStorage.getItem("appSection");
    // get cases stored in local storage if any
    caseArr = localStorage.getItem("cases");

    // if there was no previous section or page saved then run
    // the home page
    if (appSection==null) {
        appSection = "home";
        sectionTracker(appSection)
    } else {

    }

    // run the App on page load
    app(appSection,'placeholder')//instanciate the app

});

// used for development
function testApp() {
    alert('its working')
}

// the funtion selects and renders what section/page of the 
// app is to display/run or open based on user input, it has two 
// parameters which are:
// the "section" and the "data" being passed to the funtions 
// runing the pages or sections.
function app(section, data) {
    
    // track all pages eccept for login and signup
    if (section != "runLoginSignup") {
        sectionTracker(section)//track all pages
    }
    // render the app banner 
    runBanner();
    // select what section of app to render at any given time
    switch (section) {
        case "home":
          //render the home section loop
            runHomeSection(data);
          break;
        case "solutions":
            // render the solutions
            runSolutions(data);
          break;
        case "uploadCase":
            // render the case upload page
            runCaseUpload(data);
            break;
        case "profile":
            // render the profile page
                runProfile(data);
            break;
        case "uploadSolutions":
            // render the slolutions upload page
            runSolutionsUpload();
            break;
        case "runLoginSignup":
            // render the login page
            runLoginSignup();
      }
    // render the footer
    runFooter();
}

// save case data to local storage
function saveCasesToLocalStorage(cases) {
    localStorage.setItem("cases", cases);
}

// save profile data to local storage
function saveProfileToLocalStorage(profile) {
    localStorage.setItem("profile", profile);
}

// next variable user to pass what happens next after a message
// display through the app modal
var nextSection = "";
// display app model model, app nodal is used to reder status
// updates to users  
function showModal(content, action) {
    nextSection = action;
    $(".app-modal").show();
    // dispaly the data in the content variable in the modal
    document.getElementById("inner-app-modal").innerHTML = content;
}

// track the current page or section the user is browsing
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

// hides and shows the pages according to input
function hideShowSectionsAccordingly(hide, show) {

    // remove display flex from login-signup-wrapper so it can be set to display:none or hidden
    $("#login-signup-wrapper").removeClass("display-flex");
    $(".inner-app-sections").hide();// hide other windows
    $("#" + show).show();
}

// function renders the home section
function runHomeSection(sectionData) {

    if (sectionData.initialLoad == 1) {
        hideShowSectionsAccordingly("placeholder", 'home-section');//only show the home section

    } else {

        hideShowSectionsAccordingly("placeholder", 'home-section');//only show the home section
        // get cases
        getCases();
       
    }
}

// renders banner
function runBanner() {
    let bannerWrapper = document.getElementById("banner-wrapper");
    bannerWrapper.innerHTML += bannerComponent();//banner
}
// renders footer
function runFooter() {
    let footerWrapper = document.getElementById("footer-wrapper");
    footerWrapper.innerHTML += footerComponent();//footer
}
// renders case upload page
function runCaseUpload() {
    hideShowSectionsAccordingly("placeholder",'upload-case-section');//only show the home section
    let uploadCaseSection = document.getElementById("upload-case-section");
    uploadCaseSection.innerHTML = caseUploadComponent();
    userType = localStorage.getItem("userType");
}
// renders the profile page
function runProfile() {
    hideShowSectionsAccordingly("placeholder",'profile-section');//only show the home section
    let profileSection = document.getElementById("profile-section");
    profileSection.innerHTML = profileSectionComponent();//profile
}
// renders the solutions page
function runSolutionsUpload() {
    hideShowSectionsAccordingly("placeholder",'upload-solutions-section');//only show the home section
    let uploadSolutionsSection = document.getElementById("upload-solutions-section");
    uploadSolutionsSection.innerHTML = solutionsUploadComponent();//footer
}

// run an individual case in the solutions page, this is the case
// on top of the solutions page
function runSolutionsCase(caseObject) {
    appSection = "solutions-section";
    counter = 1;
    getBusiness(caseObject[0],appSection,counter)
}

// function renders all the solutions related to the case
function runSolutions(caseId) {
    
    if (caseId == "placeholder") {
        // get case ID from local storage
        id = localStorage.getItem("case");
        if (id) {
            // do nothing
        } else {
            // if case ID isnt set go back to home page
            app('home',{initialLoad:0})
        }

    } else {
        // set case
        localStorage.setItem("case", caseId); 
        id = caseId;
    }

    // get the clicked case, if case is set
    getCase(id);

    // hide all the other pages or sections and only show solutions section.
    hideShowSectionsAccordingly("placeholder",'solutions-section');//only solution section

}
// render login
function runLoginSignup() {
    
    hideShowSectionsAccordingly("placeholder", 'login-signup-wrapper');
    $("#login-signup-wrapper").addClass("display-flex");//so the loging container is center
    let loginSignupWrapper = document.getElementById("login-signup-wrapper");
    loginSignupWrapper.innerHTML = loginSignupComponent();//footer
}

// renders the banner component when called
function bannerComponent() {
    return `<div class="banner" onclick="logOut()">
    <div class="logout-button">
    <span class="material-symbols-outlined">
        power_settings_new
    </span>
    </div>
    UNIBUD
    </div>`
}

// case component
function caseComponent(caseObject) {
    return `<div id="case-container${caseObject.counter}" class="case-container" onclick="transformIntoSolutionPage('${caseObject.unibudCase.id}')">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="${baseURL}/View/uploads/${caseObject.businessProfileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${caseObject.businessName}
                    </div>
                    <div class="date-posted">
                        ${String((caseObject.unibudCase.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="${baseURL}/View/uploads/${caseObject.unibudCase.caseImage}"></object>
            </div>
        <div class="case-instructions solution-">
            <span class="fixed-height case-subject">${caseObject.unibudCase.caseDescription }</span>
        </div>
    </div>`
}

// renders solutions component when called.
function solutionsComponent(caseObject) {
    return`<div id="case-container${caseObject.counter}" class="case-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="${baseURL}/View/uploads/${caseObject.businessProfileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${caseObject.businessName}
                    </div>
                    <div class="date-posted">
                        ${String((caseObject.unibudCase.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="${baseURL}/View/uploads/${caseObject.unibudCase.caseImage}"></object>
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
                    <div class="upload-solution-btn-wrapper" onclick="setCaseId(${caseObject.unibudCase.id})">
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

// renders solution component when called.
function solutionComponent(solutionObject) {
    return`<div id="case-container${solutionObject.counter}" class="solution-container">
            <div class="image-video-container">
                <div class="user-profile-wrapper">
                    <div class="business-profile-pic">
                        <object class="case-image" data="${baseURL}/View/uploads/${solutionObject.profileImage}"></object>
                    </div>
                    <div class="business-name">
                    ${solutionObject.unibudSolution.firstName+" "+solutionObject.educationInstituteName}
                    </div>
                    <div class="date-posted">
                        ${String((solutionObject.unibudSolution.dateTime))}
                    </div>
                </div>
                <object class="case-image" data="${baseURL}/View/uploads/${solutionObject.unibudSolution.solutionsImage}"></object>
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
                ${solutionObject.unibudSolution.solutionsInstructions}
            </div>
        </div>
    </div>`
}

// renders the case upload component when called.
function caseUploadComponent(unibudCase) {
    return `
    <form id="upload-case-form" method="Post" enctype="multipart/form-data">
        <div class="upload-case-container case-upload-image-cont case-container">
                <input class="upload-case-document upload-case-file-input case-image-video" type="file" name="imageUpload" id="imageUpload" onchange="setIamgeCaseFile(event)">
                <input type="hidden" id="temporarily-store-case-image-name" name="temporarily-store-case-image-name" value="${uploadCaseImage}">   
                <object class="case-image" data="${baseURL}/View/uploads/${uploadCaseImage}">
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
            </div>
        </form>`;
}

// renders the solutions upload component when called.
function solutionsUploadComponent(unibudCase) {
    return `
    <form id="upload-case-form" method="Post" enctype="multipart/form-data">
        <div class="upload-case-container case-upload-image-cont case-container">
                <input class="upload-case-document upload-case-file-input case-image-video" type="file" name="imageUpload" id="imageUpload" onchange="setIamgeCaseFile(event)">
                <input type="hidden" id="temporarily-store-case-image-name" name="temporarily-store-case-image-name" value="${uploadCaseImage}">   
                <object class="case-image" data="${baseURL}/View/uploads/${uploadCaseImage}">
                    <span class="case-upload-image material-symbols-outlined">
                        center_focus_strong
                    </span>
                </object>        
                </div>
            <div class="upload-case-form-wrapper">
                    <textarea id="case-description"  rows="2" class="upload-styles case-description" name="case-description" placeholder="Describe your solution">${caseUploadDescription}</textarea>
                    <br>
                    <textarea id="case-instructions"  rows="3" class="upload-styles case-instructions" name="case-instructions" placeholder="Tell us what you have done">${caseUploadInstruction}</textarea>
                    
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
                    <button type="button" name="upload-case" id="upload-btn" onclick="saveSolution()" class="solutions-upload-btn btn btn-dark">Upload Solutions</button>
            </div>
        </form>`;
}

// renders the profile section component when called.
function profileSectionComponent() {
    return `
    <div class="profile-banner">
        <div class="profile-pic">
        
        <object class="entity-profile-image" data="${baseURL}/View/uploads/${profileImage}"></object>
        <input class="entity-profile-pic" type="file" name="entityProfileImage" id="entityProfileImage" onchange="setProfileIamge(event)">
            <input type="hidden" id="temporarily-store-profile-image-name" name="temporarily-store-profile-image-name" value="${profileImage}"> 
        </div>
    </div>
    <div class="txt-inputs-wrapper">
        <br>
        <!----<input type="text"  class="business-organization-name entity-profile-inputs upload-styles "   value="" placeholder="Business organization name">
        
        <br>-->
        <input type="text" ${userType=="student" ? 'name="education-institute-name" id="education-institute-name" ' : ' id="business-organization-name" name="business-organization-name" '} class="education-institute-name entity-profile-inputs upload-styles "   value="" placeholder="${userType == "student" ? 'Education institute name' : 'Business organization name'}">
        
        
        <br>
        <textarea id="entity-description"  rows="2" class="entity-profile-inputs upload-styles entity-description" name="entity-description" placeholder="Describe Your self or your business"></textarea>

        <div class="save-profile-wrapper">
        <button type="button" name="save-profile" ${userType=="student" ? 'onclick="saveStudent()"' : 'onclick="saveBusiness()"'} class="save-profile btn btn-dark">Save profile</button>
        
        </div>
    </div>
    `
}

// renders the footer section component when called.
function footerComponent() {
    return`
    <div class="footer">
        <div class="footer-btns" onclick="app('home',{initialLoad:1})">
            <span class="material-icons">
                home
            </span>
        </div>
        <div class="footer-btns">
            <span class="material-icons" onclick="checkSessionBeforeUpload(0)">
                add
            </span>
        </div>
        <div class="footer-btns" onclick="app('profile',{initialLoad:0})" >
            <span class="material-icons">
                person
            </span>
        </div>

    </div>`
}

// renders the login and signup component when called.
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
                <input class="login-text-inputs left-margin signup-inputs" type="email" id="email" name="email" value="" placeholder="Email" required>
                <input class="login-text-inputs signup-inputs" type="password" id="pass-word" name="password" value="" placeholder="password" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="website" name="website" value="" placeholder="Website" required>
                <input class="login-text-inputs signup-inputs" type="text" id="business-or-university-name" name="business-or-university-name" value="" placeholder="business or university name" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="business-or-student-about" name="business-or-student-about" value="" placeholder="business or student about" required>
                <input class="login-text-inputs signup-inputs" type="text" id="country" name="country" value="" placeholder="Country" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="city" name="city" value="" placeholder="City" required>
                <input class="login-text-inputs signup-inputs" type="text" id="suburb" name="suburb" value="" placeholder="Suburb" required><br>
                <input class="login-text-inputs left-margin signup-inputs" type="text" id="street-address" value="" name="street-address" placeholder="Street Address" required>
                <input class="login-text-inputs signup-inputs" type="text" id="post-code" name="post-code" value="" placeholder="Post Code"><br>
                <select class="login-text-inputs left-margin signup-inputs" name="user-type" id="user-type">
                    <option value="student">Select account type </option>
                    <option value="business">Business</option>
                    <option value="student">Student</option>
                </select>
                <button class="login-text-inputs signup-btns left-margin signup-inputs" type="button" onclick="signup()">Signup</button><br>
                <button class="login-text-inputs signup-btns signup-inputs" type="button" onclick="openLogin()">Login</button>
              </form>
        </div>`;
}
