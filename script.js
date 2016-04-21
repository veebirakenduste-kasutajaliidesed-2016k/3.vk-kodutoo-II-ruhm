
$(document).ready(function(){
    $("input[name=load]").click(function(){
        $("#picture").show();
        var ajax = $.ajax({
                      type: "GET",
                      url : 'cat1.jpg',
                      success : function(data){
                            $("#picture").hide();
                      },
                   });
    });
});
