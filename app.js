  (function(){
  "use strict";

  var ToDo = function(){
    // SEE ON SINGLETON PATTERN
    if(ToDo.instance){
      return ToDo.instance;
    }
    //this viitab ToDo fn
    ToDo.instance = this;

    this.routes = ToDo.routes;
    // this.routes['home-view'].render()

    console.log('ToDo sees');

    // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    // hakkan hoidma kõiki ülesandeid
    this.tasks = [];

    // Kui tahan ToDole referenci siis kasutan THIS = ToDo RAKENDUS ISE
    this.init();
  };

  window.ToDo = ToDo; // Paneme muuutja külge

  ToDo.routes = {
    'home-view': {
      'render': function(){
        // käivitame siis kui lehte laeme
        console.log('>>>>avaleht');
      }
    },
    'list-view': {
      'render': function(){
        // käivitame siis kui lehte laeme
        console.log('>>>>loend');
        //simulatsioon laeb kaua
        window.setTimeout(function(){
        //document.querySelector('.loading').innerHTML = 'laetud!';
        $(".loading").css({ display: "none" });
        }, 3000);
      }
    },
    'manage-view': {
      'render': function(){
      // käivitame siis kui lehte laeme
      }
    }
  };

  // Kõik funktsioonid lähevad ToDo külge
  ToDo.prototype = {
    init: function(){
      console.log('Rakendus läks tööle');

      //kuulan aadressirea vahetust
      window.addEventListener('hashchange', this.routeChange.bind(this));

      // kui aadressireal ei ole hashi siis lisan juurde
      if(!window.location.hash){
        window.location.hash = 'home-view';
        // routechange siin ei ole vaja sest käsitsi muutmine käivitab routechange event'i ikka
      }else{
        //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
        this.routeChange();
      }

      //saan kätte ülesanded localStorage'ist kui on
      if(localStorage.tasks){
        //võtan stringi ja teen tagasi objektideks
        this.tasks = JSON.parse(localStorage.tasks);
        console.log('laadisin localStorageist massiiivi ' + this.tasks.length);

        //tekitan loendi htmli
        this.tasks.forEach(function(item){
          var new_item = new Item(item.id, item.title, item.task, item.due_date);

          var li = new_item.createHtmlElement();
          $('.list-of-tasks').append(li);
        });
      }else {
        //küsin AJAXiga
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            ToDo.instance.tasks=JSON.parse(xhttp.responseText);
            console.log(ToDo.instance.tasks);

            //teen ülesanded htmli
            ToDo.instance.tasks.forEach(function(item){
              var new_item = new Item(item.id, item.title, item.task, item.due_date);

              var li = new_item.createHtmlElement();

              $('.list-of-tasks').append(li);
            });
            //salvestan localStoragisse
            localStorage.setItem('tasks', JSON.stringify(ToDo.instance.tasks));
          }
        };
        xhttp.open("GET", "save.php", true);
        xhttp.send();
      }
      // esimene loogika oleks see, et kuulame hiireklikki nupul
      this.bindEvents();
    },

    bindEvents: function(){
      $('.add-new-item').on('click', this.addNewClick.bind(this));
      $('.change-item').on('click', this.ChangeClick.bind(this));
      $('.cancel-change-item').on('click', this.CancelChangeClick.bind(this));
      $('.load-notes').on('click', this.LoadNotesClick.bind(this));
      $('.add-new-note').on('click', this.AddNoteClick.bind(this));
      $('.hide-notes').on('click', this.HideNotesClick.bind(this));
      $('.show-notes').on('click', this.ShowNotesClick.bind(this));
      //kuulan trükkimist otsikastis
      $('#search').on('keyup', this.search.bind(this));
    },

    deleteItem: function(event){
      // millele vajutasin SPAN
      console.log(event.target);
      // tema parent ehk mille sees ta on LI
      console.log(event.target.parentNode);
      //mille sees see on UL
      console.log(event.target.parentNode.parentNode);
      //id
      console.log(event.target.dataset.id);

      var c = confirm("Oled kindel?");
      // vajutas no, pani ristist kinni
      if(!c){	return; }

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //KUSTUTAN OBJEKTI ja uuenda localStoragit
      var delete_id = event.target.dataset.id;

      for(var i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].id == delete_id){
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };

      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+delete_id, true);
      xhttp.send();
      console.log(delete_id);
    },
    changeItem: function(event){
      //MUUDAN
      console.log(JSON.parse(localStorage.tasks));

      var tasks = JSON.parse(localStorage.tasks);
      for(var t=0; t < tasks.length; t++){
        if(tasks[t] .id== event.target.dataset.id){
          $('.id_holder').html(tasks[t].id);
          $('.change_title').val(tasks[t].title);
          $('.change_task').val(tasks[t].task);
          $('.change_due_date').val(tasks[t].due_date);
          break;
        }
      }
      $(".change").css({ display: "block" });
    },
    search: function(event){
      //otsikasti väärtus
      var needle = $('#search').val().toLowerCase();
      console.log(needle);

      var list = $('ul.list-of-tasks li');
      console.log(list);

      for(var i = 0; i < list.length; i++){
        var li = list[i];
        // ühe listitemi sisu tekst
        var stack = li.querySelector('.content').innerHTML.toLowerCase();
        //kas otsisõna on sisus olemas
        if(stack.indexOf(needle) !== -1){
          //olemas
          li.style.display = 'list-item';
        }else{
          //ei ole, index on -1, peidan
          li.style.display = 'none';
        }
      }
    },
    LoadNotesClick: function(){

      $.PostItAll.load();
    },

    AddNoteClick: function(){
      $.PostItAll.new({
      features: {
          savable : true
      }
      });
    },

    HideNotesClick: function(){
      $.PostItAll.hide();
      $(".show-notes").css({ display: "block" });
      $(".hide-notes").css({ display: "none" });
    },

    ShowNotesClick: function(){
      $.PostItAll.show();
      $(".show-notes").css({ display: "none" });
      $(".hide-notes").css({ display: "block" });
    },

    CancelChangeClick: function(){
      $('.change').hide();
    },

    ChangeClick: function(event){
      console.log("ChangeClick");
      var id = $('.id_holder').text();
      var title = $('.change_title').val();
      var task = $('.change_task').val();
      var due_date = $('.change_due_date').val();
      var delete_id = $('.id_holder').text();

      for(var i = 0; i < this.tasks.length; i++){

        if(this.tasks[i].id == delete_id){
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+delete_id, true);
      xhttp.send();
      location.reload();

      var new_item = new Item(id, title, task, due_date);

      this.tasks.unshift(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp2 = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp2.onreadystatechange = function() {
        console.log(xhttp2.readyState);
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
          console.log(xhttp2.responseText);
        }
      };
      //teeb päringu
      xhttp2.open("GET", "save.php?id="+id+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp2.send();

      // 2) lisan selle htmli listi juurde
      li = new_item.createHtmlElement();
      $('.list-of-tasks').append(li);
      $('.change').hide();
    },

    addNewClick: function(event){
      //salvestame ülesande
      var title = $('.title').val();
      var task = $('.task').val();
      var due_date = $('.due_date').val();

      //console.log(title + ' ' + task);
      //1) tekitan uue Item'i
      var id = guid();
      var new_item = new Item(id, title, task, due_date);

      //lisan massiiivi ülesande
      this.tasks.push(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      xhttp.open("GET", "save.php?id="+id+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp.send();

      // 2) lisan selle htmli listi juurde
      var li = new_item.createHtmlElement();
      $('.list-of-tasks').append(li);

      $('.title').val("");
      $('.task').val("");
      $('.due_date').val("");

      $('.adding-message').css({ display: "block" });
      $('.adding-message').text("Ülesanne nimega '"+ title +"' lisatud!");

      window.setTimeout(function(){
      $(".adding-message").css({ display: "none" });
      }, 5000);
    },

    routeChange: function(event){
      //kirjutan muuutujasse lehe nime, võtan maha #
      this.currentRoute = location.hash.slice(1);
      console.log(this.currentRoute);

      //kas meil on selline leht olemas?
      if(this.routes[this.currentRoute]){

        //muudan menüü lingi aktiivseks
        this.updateMenu();

        this.routes[this.currentRoute].render();

      }else{
        /// 404 - ei olnud
      }
    },

    updateMenu: function() {
      //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
      //1) võtan maha aktiivse menüülingi kui on
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');
      //2) lisan uuele juurde
      //console.log(location.hash);
      document.querySelector('.'+this.currentRoute).className += ' active-menu';
    }
  }; //ToDo LÕPP


  var Item = function(new_id, new_title, new_task, new_due_date){
    this.id = new_id;
    this.title = new_title;
    this.task = new_task;
    this.due_date = new_due_date;
  };

  Item.prototype = {
    createHtmlElement: function(){

      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.task + ' | ' + this.due_date);
      span_with_content.appendChild(content);

      li.appendChild(span_with_content);

      //DELETE nupp
      var span_delete = document.createElement('span');
      span_delete.style.color = "red";
      span_delete.style.cursor = "pointer";

      //kustutamiseks panen id kaasa
      span_delete.setAttribute("data-id", this.id);

      span_delete.innerHTML = "  Kustuta";

      li.appendChild(span_delete);

      //keegi vajutas nuppu
      span_delete.addEventListener("click", ToDo.instance.deleteItem.bind(ToDo.instance));

      //CHANGE nupp
      var span_change = document.createElement('span');
      span_change.style.color = "green";
      span_change.style.cursor = "pointer";

      //muutmiseks id kaasa
      span_change.setAttribute("data-id", this.id);
      span_change.innerHTML = "  Muuda";
      li.appendChild(span_change);
      //keegi vajutas nuppu
      span_change.addEventListener("click", ToDo.instance.changeItem.bind(ToDo.instance));

      return li;
    }
  };

  //HELPER
  function guid(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
  // kui leht laetud käivitan ToDo rakenduse
  window.onload = function(){
    var app = new ToDo();
  };
})();
