
$(document).ready(function(){
    $('#boxMultibar').multibar();

    $("input[name=load]").click(function(){
        $.ajax({
              url: 'cat1.jpg',
              beforeSend: function(){
                $('#text').show();
              },
              complete: function(){
              },
              success: function(html){
                $('#text').hide();
                $('#picture').show();
              }
        });
    });
});
