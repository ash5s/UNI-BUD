
// function transformIntoSolutionPage(id) {
//     // open solutions page by calling the "app()" functins with
//     //two parameters the name of the page or section to open 
//     //and the data being passed to that section or page
//     alert(id)
//     app('solutions', id);
// }

function showDetails(id) {
    $("#inner-instructions-container"+id).toggle();
}