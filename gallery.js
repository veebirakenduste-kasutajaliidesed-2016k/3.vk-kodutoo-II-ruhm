(function(){
  "use strict";


  var Gallery = function() {

    if(Gallery.instance) {
      return Gallery.instance;
    }

    Gallery.instance = this;

    this.init();
    };

    Gallery.prototype = {
      init: function() {

        this.loadImages();
        this.createModal();
        this.mouseEvents();

      },

      mouseEvents: function() {
        $('#upload-img').click(this.openModal.bind(this));
        var img = document.querySelectorAll(".imgdiv");

        $(document).on('click', 'img', function () {
          var url =   $(location).attr('href');

          $("#image").html("<img src=" + url.substring(0, url.lastIndexOf("/") + 1) + $(this).attr("src") + ">");
          $("#image-url").html("<a href=" + url.substring(0, url.lastIndexOf("/") + 1) + $(this).attr("src") + ">Vajuta, et avada uuel aknal.</a>");
          $("#width-answer").html($(this).css("width"));
          $("#height-answer").html($(this).css("height"));
          Gallery.instance.openImgModal();
        });
        /*for(var i = 0; i < img.length; i++) {
          if(img[i].) {

          }
        }*/

      },

      loadImages: function() {
        $.ajax({
          url : "images/",
          success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(jpeg|jpg|png)$/) ) {
                    $("#gallery-img").append( "<div id='gallery-img' class='col-xs-6 col-md-3 imgdiv'><a class='thumbnail'><img class='image' src='"+ "images/" + val +"'></a></div>" );
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
        $( "#img-dialog" ).dialog({
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
      },

      openImgModal: function() {
        $( "#img-dialog" ).dialog( "open" );
      }

  };


    window.onload = function() {
      var app = new Gallery();

    };





}) ();
