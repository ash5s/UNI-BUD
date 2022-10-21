$(document).ready(function(){
    $("#app-modal-btn").click(function () {

        if (nextSection=="runLoginSignup") {
            app('runLoginSignup', 'placeholder')
        }
        
        $(".app-modal").hide();
    });
  });