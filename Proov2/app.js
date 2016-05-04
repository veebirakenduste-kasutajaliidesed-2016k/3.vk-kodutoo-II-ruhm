(function(){

  var App = function(){
    if(App.instance){
      return App.instance;
    }
    App.instance = this;

    this.init();
  };

  window.App = App;

  App.prototype = {
    init: function(){
      console.log('Rakendus läks tööle');

      this.bindEvents();
    },
    bindEvents: function(){
      document.querySelector('.save').addEventListener('click', this.save.bind(this));
      document.querySelector('.load').addEventListener('click', this.load.bind(this));


    },
    save: function(event){
      var time = document.querySelector('.time').value;

      var new_time = new Time(time);

      //Salvestan AJAXiga
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
         console.log(xhttp.responseText);
        }
      };

      //teeb päringu
      xhttp.open("GET", "save.php?time="+time, true);
      xhttp.send();
    },
    load: function(){

      $.ajax({url: "data.txt", success: function(result){

        document.getElementById("load_data").innerHTML = result;

        var arrayFromFile = JSON.parse(result);

        //arrayFromFile[arrayFromFile.length-1].name;


        for(var i=0; i<arrayFromFile.length; i++){
          var newDiv = document.createElement('div');
          newDiv.id = "timer_"+(Math.random()*1000).toFixed();

          document.querySelector('body').appendChild(newDiv);

          $('#'+newDiv.id).flipcountdown({
            size:'lg',
            beforeDateTime: arrayFromFile[i].time
           });
        }

     }});

       /*var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
           document.getElementById("load_data").innerHTML = xhttp.responseText;

           var arrayFromFile = JSON.parse(xhttp.responseText);

           //arrayFromFile[arrayFromFile.length-1].name;


           for(var i=0; i<arrayFromFile.length; i++){
             var newDiv = document.createElement('div');
             newDiv.id = "timer_"+(Math.random()*1000).toFixed();

             document.querySelector('body').appendChild(newDiv);

             $('#'+newDiv.id).flipcountdown({
               size:'lg',
               beforeDateTime: arrayFromFile[i].time
              });
           }


         }
       };
        xhttp.open("GET", "data.txt", true);
        xhttp.send();*/

    }
  }; //api lõpp

  var Time = function(new_time){
    this.name = new_time;
    console.log('uus aeg');
  };

  window.onload = function(){
    var app = new App();
  };

})();
