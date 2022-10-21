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
