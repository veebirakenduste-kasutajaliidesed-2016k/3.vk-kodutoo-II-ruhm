(function(){
  "use strict";

  var Words = function() {

    if(Words.instance) {
      return Words.instance;
    }

    Words.instance = this;

    this.init();
    };

    Words.prototype = {
      init: function() {

        this.listenClick();

      },

      listenClick: function() {
        $('#get').click(this.getWords.bind(this));
      },

      getWords: function() {
        $.ajax({
          url: "sonad.txt",
          success: function(result){
            var myarray = result.split("\n");
            for(var i = 0; i < 10; i++) {
              var item = myarray[Math.floor(Math.random()*myarray.length)];
              console.log(item);

              if(i === 0) {
                $("#content").html(item + "<br>");
              } else {
                $( "#content" ).append(item + "<br>");
              }

            }

        }});
      }









    };


    window.onload = function() {
      var app = new Words();

    };





}) ();
