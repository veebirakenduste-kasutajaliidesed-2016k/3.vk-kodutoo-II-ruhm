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



    };


    window.onload = function() {
      var app = new Words();

    };





}) ();
