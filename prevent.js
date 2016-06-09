$(document).ready(function(){
$("#search_results").slideUp();
    $("#search_button").click(function(e){
        e.preventDefault();
        ajax_search();
    });
    $("#search_term").keyup(function(e){
        e.preventDefault();
        ajax_search();
    });

});
