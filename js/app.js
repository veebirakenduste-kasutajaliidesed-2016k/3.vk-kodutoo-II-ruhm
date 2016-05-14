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
     //document.querySelector('.gs-replaybut').addEventListener('click', this.addNewClick.bind(this));
     //document.querySelector('.gs-gs-closebut').addEventListener('click', this.addNewClick.bind(this));
     //document.querySelector('#saveData').addEventListener('click', this.saveData.bind(this));


   },
   saveData: function(clicks, time){
     var name = prompt("Your Name");
    //  var new_name = new Name(name);
     console.log(name, clicks, time);
    //  var new_clicks = new Clicks(clicks);
    //  var new_time = new Time(time);

     var xhttp = new XMLHttpRequest();

     //mis juhtub kui päring lõppeb
     xhttp.onreadystatechange = function() {

       console.log(xhttp.readyState);

       if (xhttp.readyState == 4 && xhttp.status == 200) {

         console.log(xhttp.responseText);
       }
     };
     //teeb päringu
     //	xhttp.open("GET", "save.php?id="+id+"&title="+title+"&ingredients="+ingredients, true);
     xhttp.open("GET", "save.php?name="+name+"&clicks="+clicks+"&time="+time, true);
     xhttp.send();
   },
 };

 // var Name = function(new_name){
 //   this.name = new_name;
 //   console.log('created name'+this.name);
 // };
 //
 // var Clicks = function(new_clicks){
 //   this.clicks = new_clicks;
 //   //console.log('created click');
 // };
 //
 // var Time = function(new_time){
 //   this.time = new_time;
 //   //console.log('created time');
 // };

 window.onload = function(){
  var memoryGame = new MemoryGame();


  $('#my-memorygame').quizyMemoryGame({itemWidth: 156, itemHeight: 156, itemsMargin:40, colCount:5, animType:'flip' , flipAnim:'tb', animSpeed:250, resultIcons:true});
};
})();
