
$(document).ready(function(){
    $('#boxMultibar').multibar();

    $("input[name=load]").click(function(){
        $("#picture").show();
        var ajax1 = $.ajax({
                      type: "GET",
                      url : 'cat1.jpg',
                   });
       var ajax1 = $.ajax({
                     type: "GET",
                     url : 'cat2.jpg',
                  });
    });
});
