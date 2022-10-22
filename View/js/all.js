// app model
$(document).ready(function(){
    $("#app-modal-btn").click(function () {

        if (nextSection=="runLoginSignup") {
            app('runLoginSignup', 'placeholder')
        }
        
        $(".app-modal").hide();
        location.reload();
    });
});
  

// login signup
function openLogin(){
    $(".login-input-container").show();
    $(".signup-input-container").hide();
    $(".signup-input-container").removeClass("display-flex");
}

function openSignup(){
    $(".login-input-container").hide();
    $(".signup-input-container").show();
    $(".signup-input-container").addClass("display-flex");
}
// solutions

$(document).ready(function () {
    // $("#case-container"+element).hide();
    // $(".case-container").click(function(){
    //     $(".case-container").addClass("solutions-section-layout");
    // });
});

function transformIntoSolutionPage(id) {
    // open solutions page by calling the "app()" functins with
    //two parameters the name of the page or section being opened 
    //and the data being passed to that section or page
    localStorage.setItem("caseId", id)
    app('solutions', id);
}

function showDetails(id) {
    $("#inner-instructions-container"+id).toggle();
}

// 