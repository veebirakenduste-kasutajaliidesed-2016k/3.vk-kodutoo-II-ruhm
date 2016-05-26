(function(){
"use strict";

  var weather = function(){

    if(weather.instance){
      return weather.instance;
    }
    weather.instance = this;

    this.locations = [];

    this.init();
  };

  window.weather = weather;

  weather.prototype = {

    init: function(){
      	this.bindEvents();
        if(JSON.parse(localStorage.getItem("locations")!=null)){
        this.loadLocal();
        }
    },

    bindEvents: function(){
      var app = this;
      $(".send").click(function(){
        var location = $('input').val();
        app.getData(location);
        if(app.locations.length>0){
        app.locations.push(location);
        console.log(app.locations);
      }else{
        app.locations[0]=location;
      }
      app.saveLocal();
      });
      $(".del").click(function(){
        app.deleteLocal();
      });
    },
    loadLocal: function(){
      this.locations = JSON.parse(localStorage.getItem("locations"));
      for(var i = 0; i<this.locations.length; i++){
        this.getData(this.locations[i]);
      };
    },
    saveLocal: function(){
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
    getData: function(location){
      $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=89d2ff982603f097a4821ecdd4c410f7&units=metric", function( data ) {
        console.log(data);
        $(".container").append("<div class = 'item'><p>Asukoht: "+data.name+"</p><p>Riik: "+data.sys.country+"</p><p>Ilm: "+data.weather[0].description+"</p><p>Tuule kiirus: "+data.wind.speed+"</p><p>Temperatuur: "+data.main.temp+"°C</p><p>Õhuniiskus: "+data.main.humidity+"</p><p>Temperatuur max: "+data.main.temp_max+"°C</p><p>Temperatuur min: "+data.main.temp_min+"°C</p></div>")
      });
    },
    deleteLocal: function(){
      localStorage.removeItem("locations");
      this.locations = [];
      $(".container").empty();
    }
  }
    window.onload = function(){
    var app = new weather();
  };

})();
