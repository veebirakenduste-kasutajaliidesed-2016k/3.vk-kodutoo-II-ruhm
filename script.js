(function(){
   "use strict";
   var Nimekiri = function(){
     // SEE ON SINGLETON PATTERN
     if(Nimekiri.instance){
       return Nimekiri.instance;
     }
     //this viitab Nimekiri fn
     Nimekiri.instance = this;
     console.log('Nimekirja sees');
     // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
     // hakkan hoidma kõiki purke
     this.products = [];
     // Kui tahan Nimekirjale referenci siis kasutan THIS = Nimekirja RAKENDUS ISE
     this.init();
   };
   window.Nimekiri = Nimekiri; // Paneme muuutja külge
   // Kõik funktsioonid lähevad Nimekirja külge
   Nimekiri.prototype = {

//////////////////INIT STARTS////////////////////////

     init: function(){
       console.log('Rakendus läks tööle');
       window.setTimeout(function(){
         document.querySelector('.loading').innerHTML = 'laetud!';
       }, 3000);
       //saan kätte purgid localStorage kui on
       if(localStorage.products){
           //võtan stringi ja teen tagasi objektideks
           this.products = JSON.parse(localStorage.products);
           console.log('laadisin localStorageist massiivi ' + this.products.length + ' toodet');
           //tekitan loendi htmli
           this.products.forEach(function(product){
               var new_product = new Product(product.id, product.title, product.ingredients);
               var li = new_product.createHtmlElement();
               document.querySelector('.list-of-products').appendChild(li);
           });
       }else{
		   //küsin AJAXIGA
       console.log("Localstorage tühi, laeme näidistooted");

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					//console.log(xhttp.responseText);
					//tekst -> objekktideks
					Nimekiri.instance.products = JSON.parse(xhttp.responseText);
					//console.log(Nimekiri.instance.products);
					//teen tooted htmli
					Nimekiri.instance.products.forEach(function(product){
					   var new_product = new Product(product.id, product.title, product.ingredients);
					   var li = new_product.createHtmlElement();
					   document.querySelector('.list-of-products').appendChild(li);
				   });
				   //salvestan localStoragisse
				   localStorage.setItem('products', JSON.stringify(Nimekiri.instance.products));
				}
			};
			xhttp.open("GET", "save.php", true);
			xhttp.send();
	   }
       // esimene loogika oleks see, et kuulame hiireklikki nupul
       this.bindEvents();
     },

//////////////////INIT ENDS////////////////////////

//////////////////EVENTS STARTS////////////////////////

     bindEvents: function(){
       document.querySelector('.add-new-product').addEventListener('click', this.addNewClick.bind(this));
       //kuulan trükkimist otsikastis
       document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
     },

//////////////////EVENTS ENDS////////////////////////

//////////////////DELETE STARTS////////////////////////

	 deleteProduct: function(event){
		// millele vajutasin SPAN
		//console.log(event.target);
		// tema parent ehk mille sees ta on LI
		//console.log(event.target.parentNode);
		//mille sees see on UL
		//console.log(event.target.parentNode.parentNode);
		//id
		//console.log(event.target.dataset.id);
		var c = confirm("Oled kindel?");
		// vajutas no, pani ristist kinni
		if(!c){	return; }
		//KUSTUTAN
		console.log('kustutan');
		// KUSTUTAN HTMLI
		var ul = event.target.parentNode.parentNode;
		var li = event.target.parentNode;
		ul.removeChild(li);
		//KUSTUTAN OBJEKTI ja uuenda localStoragit
		var delete_id = event.target.dataset.id;
		for(var i = 0; i < this.products.length; i++){
			if(this.products[i].id == delete_id){
        var php_delete = delete_id;
				//see on see
				//kustuta kohal i objekt ära
				this.products.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('products', JSON.stringify(this.products));
	 },

//////////////////DELETE ENDS////////////////////////

//////////////////CHANGE STARTS/////////////////////

  changeProduct: function(event){
    console.log("change");
    var li = event.target.parentNode;
    var content = event.target.previousSibling.previousSibling.innerHTML;
    var n = content.indexOf(" |");
    var product = content.substring(0, n);
    var comment = content.substring(n + 3);
    li.removeChild(event.target.previousSibling);
    li.removeChild(event.target.previousSibling);
    li.removeChild(event.target);
    var prod_input = document.createElement('input');
    var comm_input = document.createElement('input');
    prod_input.setAttribute("type", "text");
    prod_input.setAttribute("value", product);
    comm_input.setAttribute("type", "text");
    comm_input.setAttribute("value", comment);
    li.appendChild(prod_input);
    li.appendChild(comm_input);
///////////Change nupp
  	   var span_ready = document.createElement('span');
  	   span_ready.style.color = "green";
  	   span_ready.style.cursor = "pointer";
  	   span_ready.innerHTML = " READY";
  	   li.appendChild(span_ready);
  	   //keegi vajutas nuppu
  	   span_ready.addEventListener("click", this.updateData.bind(this));
  },

//////////////////CHANGE ENDS/////////////////////

//////////////////UPDATE STARTS/////////////////////

  updateData: function(event){
    console.log('update');
    var li = event.target.parentNode;
    var product_input_value = event.target.previousSibling.previousSibling.value;
    var comm_input_value = event.target.previousSibling.value;
    var content = document.createTextNode(product_input_value + ' | ' + comm_input_value);
    li.removeChild(event.target.previousSibling);
    li.removeChild(event.target.previousSibling);
    var id = event.target.previousSibling.id;
    li.removeChild(event.target.previousSibling);
    li.removeChild(event.target);
//////NEW LETTER span
      var span = document.createElement('span');
      span.className = 'letter';
      span.id = id;
      span.style.cursor = "pointer";
      span.addEventListener("click", Nimekiri.instance.markProduct.bind(Nimekiri.instance));
      var letter = document.createTextNode(product_input_value.charAt(0));
      span.appendChild(letter);
      li.appendChild(span);
////////NEW CONTENT SPAN
      var new_span = document.createElement('span');
      new_span.className = 'content';
      new_span.appendChild(content);
      li.appendChild(new_span);
///////localstorage update
    for(var i = 0; i < this.products.length; i++){
     if(this.products[i].id == id){
        this.products[i].title = product_input_value;
        this.products[i].ingredients = comm_input_value;
        break;
     }
    }
     localStorage.setItem('products', JSON.stringify(this.products));
/////DELETE nupp
  	   var span_delete = document.createElement('span');
  	   span_delete.style.color = "red";
  	   span_delete.style.cursor = "pointer";
  	   //kustutamiseks panen id kaasa
  	   span_delete.setAttribute("data-id", id);
  	   span_delete.innerHTML = " X";
  	   li.appendChild(span_delete);
  	   //keegi vajutas nuppu
  	   span_delete.addEventListener("click", Nimekiri.instance.deleteProduct.bind(Nimekiri.instance));
/////CHANGE nupp
  	   var span_change = document.createElement('span');
  	   span_change.style.color = "green";
  	   span_change.style.cursor = "pointer";
  	   //kustutamiseks panen id kaasa
  	   span_change.setAttribute("data-id", id);
  	   span_change.innerHTML = " EDIT";
  	   li.appendChild(span_change);
  	   //keegi vajutas nuppu
  	   span_change.addEventListener("click", Nimekiri.instance.changeProduct.bind(Nimekiri.instance));
         return li;
  },

//////////////////UPDATE ENDS///////////////////////

//////////////////MARK STARTS///////////////////////

markProduct: function(event){
  console.log("mark");
  var span = event.target;
  //var li = event.target.parentNode;
  var next_span = event.target.nextSibling;
  var del = document.createElement('DEL');
  if (span.hasAttribute("clicked")){
    span.style.color = 'rgb(146, 168, 209)';
    next_span.style.textDecoration = "none";
    next_span.style.color = "black";
    span.style.border = "1px solid rgb(146, 168, 209)";
    span.removeAttribute("clicked");
  }else{
    span.setAttribute("clicked", "true");
    span.style.color = 'lightgray';
    next_span.style.textDecoration = "line-through";
    next_span.style.color = "lightgray";
    span.style.border = "1px solid lightgray";
  }
},

//////////////////MARK ENDS///////////////////////

//////////////////SEARCH STARTS////////////////////////

    search: function(event){
       //otsikasti väärtus
       var needle = document.querySelector('#search').value.toLowerCase();
       console.log(needle);
       var list = document.querySelectorAll('ul.list-of-products li');
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

//////////////////SEARCH ENDS////////////////////////

//////////////////SAVE STARTS////////////////////////

     addNewClick: function(event){
       //salvestame purgi
       var title = document.querySelector('.title').value;
       var ingredients = document.querySelector('.ingredients').value;
       //1) tekitan uue product'i
	     var id = guid();
       var new_product = new Product(id, title, ingredients);
       //lisan massiiivi purgi
       this.products.push(new_product);
       console.log(JSON.stringify(this.products));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('products', JSON.stringify(this.products));
	     //AJAX
       /*
		   var xhttp = new XMLHttpRequest();
		   //mis juhtub kui päring lõppeb
		   xhttp.onreadystatechange = function() {
			    console.log(xhttp.readyState);
			       	if (xhttp.readyState == 4 && xhttp.status == 200) {
			             console.log(xhttp.responseText);
			        }
		   };
	     //teeb päringu
		   xhttp.open("GET", "save.php?id="+id+"&title="+title+"&ingredients="+ingredients, true);
		   xhttp.send();
       */
       // 2) lisan selle htmli listi juurde
       var li = new_product.createHtmlElement();
       document.querySelector('.list-of-products').appendChild(li);
     },

//////////////////SAVE ENDS////////////////////////

   };

//////////////////// Nimekirja LÕPP////////////////

   var Product = function(new_id, new_title, new_ingredients){
	    this.id = new_id;
      this.title = new_title;
      this.ingredients = new_ingredients;
      console.log('created new product');
   };
   Product.prototype = {
     createHtmlElement: function(){
       var li = document.createElement('li');
       var span = document.createElement('span');
       span.className = 'letter';
       span.id = this.id;
       span.style.cursor = "pointer";
       span.addEventListener("click", Nimekiri.instance.markProduct.bind(Nimekiri.instance));
       var letter = document.createTextNode(this.title.charAt(0));
       span.appendChild(letter);
       li.appendChild(span);
       var span_with_content = document.createElement('span');
       span_with_content.className = 'content';
       var content = document.createTextNode(this.title + ' | ' + this.ingredients);
       span_with_content.appendChild(content);
       li.appendChild(span_with_content);
	/////DELETE nupp
	   var span_delete = document.createElement('span');
	   span_delete.style.color = "red";
	   span_delete.style.cursor = "pointer";
	   //kustutamiseks panen id kaasa
	   span_delete.setAttribute("data-id", this.id);
	   span_delete.innerHTML = " X";
	   li.appendChild(span_delete);
	   //keegi vajutas nuppu
	   span_delete.addEventListener("click", Nimekiri.instance.deleteProduct.bind(Nimekiri.instance));
/////CHANGE nupp
	   var span_change = document.createElement('span');
	   span_change.style.color = "green";
	   span_change.style.cursor = "pointer";
	   //kustutamiseks panen id kaasa
	   span_change.setAttribute("data-id", this.id);
	   span_change.innerHTML = " EDIT";
	   li.appendChild(span_change);
	   //keegi vajutas nuppu
	   span_change.addEventListener("click", Nimekiri.instance.changeProduct.bind(Nimekiri.instance));
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
   // kui leht laetud käivitan Nimekirja rakenduse
   window.onload = function(){
     var app = new Nimekiri();
   };
})();
