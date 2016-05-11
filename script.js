
$(document).ready(function(){
    $('#boxMultibar').multibar();

    $("input[name=load]").click(function(){
        $.ajax({
              url: 'images.json',
              dataType: "json",

              error: function(err){
                console.log(err);
              },
              success: function(array){
                console.log(array);
                
                $.each( array, function( key, img ) {
                  //append
                  var imgHtml = $('<img src="'+img.url+'">');
                  $("body").append(imgHtml);
                });
              },
        });
    });
});
