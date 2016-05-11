
$(document).ready(function(){


    $("input[name=load]").click(function(){
        $.ajax({
              url: 'images.json',
              dataType: "json",
              success: function(array){
                $('#boxMultibar').multibar();
                $("#button").hide();


                $.each( array, function( key, img ) {

                  var imgHtml = $('<img src="'+img.url+'">');
                  $("body").append(imgHtml);
                });
              },
        });
    });
});
