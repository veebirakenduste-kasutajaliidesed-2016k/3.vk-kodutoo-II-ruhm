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
      var name = document.querySelector('.name').value;

      var new_name = new Name(name);

      //Salvestan AJAXiga
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
         console.log(xhttp.responseText);
        }
      };

      //teeb päringu
      xhttp.open("GET", "save.php?name="+name, true);
      xhttp.send();
    },
    load: function(){
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
           document.getElementById("load_data").innerHTML = xhttp.responseText;
         }
       };
        xhttp.open("GET", "data.txt", true);
        xhttp.send();
    }
  }; //api lõpp

  var Name = function(new_name){
    this.name = new_name;
    console.log('uus nimi');
  };

  window.onload = function(){
    var app = new App();
  };

})();
