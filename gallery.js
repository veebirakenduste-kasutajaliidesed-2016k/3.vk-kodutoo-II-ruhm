(function(){
  "use strict";

  var Gallery = function() {

    if(Gallery.instance) {
      return Gallery.instance;
    }

    Gallery.instance = this;

    /*
    Kataloogist loetakse failid sisse
    Pildi sisestamisel tuleb sisestada metaandmed, mis salvestatakse andmebaasi
    Muidu lambine galerii
    Peale vajutades võiks avada modali pildiga ning kuvada metaandmeid
    */

    this.init();
    };

    Gallery.prototype = {
      init: function() {

        this.loadImages();

      },

    loadImages: function() {
      $.ajax({
        url : "images/",
        success: function (data) {
          $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(jpeg|jpg|png)$/) ) {
                  $("body").append( "<img src='"+ "images/" + val +"'>" );
              }
          });
        }
      });
    }





    };


    window.onload = function() {
      var app = new Gallery();

    };





}) ();
