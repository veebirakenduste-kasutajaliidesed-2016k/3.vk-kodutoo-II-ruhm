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
        this.createModal();
        this.mouseEvents();

      },

      mouseEvents: function() {
        document.querySelector("#upload-img").addEventListener("click", this.openModal.bind(this));
      },

      loadImages: function() {
        $.ajax({
          url : "images/",
          success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(jpeg|jpg|png)$/) ) {
                    $("#gallery-img").append( "<div id='gallery-img' class='col-xs-6 col-md-3'><a class='thumbnail'><img class='image' src='"+ "images/" + val +"'></a></div>" );
                }
            });
          }
        });
      },

      createModal: function() {
        $( "#dialog" ).dialog({
          autoOpen: false,
          draggable: false,
          resizable: false,
          modal: true,
          minHeight: 500,
          minWidth: 500,
          maxHeight: 1000,
          maxWidth: 1000,

        });
      },

      openModal: function() {
        $( "#dialog" ).dialog( "open" );
      }

  };


    window.onload = function() {
      var app = new Gallery();

    };





}) ();
