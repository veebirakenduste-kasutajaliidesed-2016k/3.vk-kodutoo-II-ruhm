(function(){
   "use strict";
   var MemoryGame = function(){

     if(MemoryGame.instance){
       return MemoryGame.instance;
     }

     MemoryGame.instance = this;
     this.init();
   };

   window.MemoryGame = MemoryGame;

   MemoryGame.prototype = {

     init: function(){
       console.log('Rakendus läks tööle');
       this.bindEvents();
   },
   bindEvents: function(){
     document.querySelector('.add-new-name').addEventListener('click', this.addNewClick.bind(this));
     //document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
   },


 };
 window.onload = function(){
  var MemoryGame = new MemoryGame();
};
}();
