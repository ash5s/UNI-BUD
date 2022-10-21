
$(document).ready(function () {
    // $("#case-container"+element).hide();
    // $(".case-container").click(function(){
    //     $(".case-container").addClass("solutions-section-layout");
    // });
});

function transformIntoSolutionPage(userEmailId) {
    app('solutions', userEmailId);
}

function showDetails(id) {
    $("#inner-instructions-container"+id).toggle();
}