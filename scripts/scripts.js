var $window = $(window);
var table_array = [];
var questions = [];
var titles = [];
var intro = [];
var answers = [];
var testIndex = [];
var doneTests = [0,0,0,0,0];
var k,i,nr;
var n = ["J", "K", "M", "P", "F"];
var answerAvg = [0,0,0,0,0];
var results = [0,0,0,0,0];
var fname,ffield,name,phone,email;
checkWidth();
$(window).resize(checkWidth);

// prepare the form when the DOM is ready 
$(document).ready(function() { 
    var options = { 
        beforeSubmit:  showRequest,  // pre-submit callback 
    };

    $('.analysis').submit(function() { 
		if (i>1 && !$("input[name='q']:checked").val()) {
			$('.alert__not-checked').show();
			$("label").addClass('error');
			setTimeout(function() {
			 $('.alert__not-checked').fadeOut(1000);
			}, 2000 );
			return false;
		}else{
			$(this).ajaxSubmit(options);
	        $('.analysis').empty();
	        generateQuestions(nr);
	        return false; 
		}
	}); 
});

$(document).on("click","label",function(){
	$('label').removeClass('error');
	$('label').removeClass('checked');
	$(this).addClass('checked');
});
$(document).on("click",".results__submit",function(){
	clearEverything();
	$('.analysis').append('<p class="thankyou">Aitäh, et vastasite küsimustikule. Võtame teiega ühendust X aja jooksul.</p>')
	return false;
});
$(document).on("click",".button--end",function(){
	showResults();
});$(document).on("click",".button--next",function(){
	showNextTest();
});
$('.tests__box').click(function(){
	clearEverything();
	testIndex = $(".tests__box").index(this);
	getTableData(testIndex);
  	$( '.form' ).first().show( 'fast', function showNext() {
  		$('.form').css('display', 'block');
    	$( this ).children( 'div' ).show( 'fast', showNext );
	});
	if($window.width() > 1000){
    	$('.form' ).insertAfter( '.tests' );
	}
	if($window.width() < 1000){
		if(testIndex == 0 || testIndex == 2){
			$('.form').insertAfter($(".tests__box")[testIndex+1]);
		}else{
			$('.form').insertAfter($(".tests__box")[testIndex]);
		}
	}
	if($window.width() < 567){
		$('.form').insertAfter($(".tests__box")[testIndex]);
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateQuestions(qnr){ //GENERATE QUESTIONS IN THE FORM
	nr = qnr;
	answers[0] = n[testIndex];
	if(i<questions.length){
	var a = 0;
	$('.analysis').append("<p class='analysis__title'>"+titles[z]+"</p>");
	for(i = i;i<k;i++){	
		$('.analysis').append("<li><label for="+i+">"+questions[i]+"</label><input type='radio' name='q' id="+i+" value="+(a+1)+"></li>");
			a++;
	}
	$('.analysis').append("<input type='submit' class='button button-primary' value='Edasi&nbsp➨'>");
	z++;
	k = k + 6;
	}else{
		$('.analysis').append('<canvas id="myChart" width="300" height="300"></canvas>');
		var ctx = $("#myChart").get(0).getContext("2d");
		var data = {
		labels: [n[qnr]+"1", n[qnr]+"2", n[qnr]+"3", n[qnr]+"4", n[qnr]+"5", n[qnr]+"6", n[qnr]+"7"],
		datasets: [
    	{
        label: "",
        fillColor: "rgba(0,0,0,0)",
        strokeColor: "rgba(0,0,0,1)",
        pointColor: "rgba(0,0,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [answers[2], answers[3], answers[4], answers[5], answers[6], answers[7], answers[8]]
        },
	    ]
		};
		var myRadarChart = new Chart(ctx).Radar(data);
		$('.analysis').append('<div class="graph__legend">');
		for(l = 1;l<titles.length;l++){
			$('.graph__legend').append('<p>'+n[qnr]+l+' - '+titles[l].substring(4)+'</p>');
		}
		$('.form__graph').append('</div>');
		var avgScore = (parseInt(answers[2])+parseInt(answers[3])+parseInt(answers[4])+parseInt(answers[5])+parseInt(answers[6])+parseInt(answers[7])+parseInt(answers[8]))/7;
		console.log(avgScore);
		console.log(avgScore.toString());
		console.log(avgScore.toString().substring(0,3));
		console.log(parseFloat(avgScore.toString().substring(0,3)));
		avgScore = parseFloat(avgScore.toString().substring(0,3));
		answerAvg[testIndex] = avgScore;
		doneTests[testIndex] = 1;
		results[testIndex] = answers;
		if(doneTests.indexOf(0) >= 0){
			$('.graph__legend').append('<div class="button button-primary button--next">Järgmine teema</div>');
		}
		$('.graph__legend').append('<div class="button button-primary button--end">Lõpeta</div>')
	}
}
function showRequest(formData, jqForm, options) {  //PUTS ANSWERS IN AN ARRAY FOR THE CHART
    var queryString = $.param(formData).substring(2,3); 
    answers.push(queryString);
    //console.log(answers);
 	//$('.form__graph').html(answers);
 	return true; 
}
function getTableData(x){ //PARSES JSON
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		// Sai faili tervenisti kätte
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			// faili sisu
			var response = xmlhttp.responseText;
			addTableToArray(response, x);
		}
	};
	xmlhttp.open('GET','scripts/questions.json',true);
	xmlhttp.send();
}	
function addTableToArray(response_text_from_php, x){ //PUT JSON STUFF INTO ARRAYS
	table_array = JSON.parse(response_text_from_php);
	for(var key in table_array[x].questions){
		questions.push(table_array[x].questions[key]);
	}
	for(var key in table_array[x].titles){
		titles.push(table_array[x].titles[key]);
	}
	for(var key in table_array[x].intro){
		intro.push(table_array[x].intro[key]);
	}		
	generateQuestions(x);
	$("<p>"+intro[0]+"</p>").insertAfter(".analysis__title");
}
function clearEverything(){ //CLEAR ALL
	$('.analysis').empty();
	$('#myChart').remove();
	$('.graph__legend').remove();
	answers = [];
	questions = [];
	titles = [];
	intro = [];
	testIndex = [];
	i = 0;
	k = 0;
	z = 0;
}
function checkWidth() { //CHECK THE WIDTH OF THE WINDOW
    if($window.width() > 1000){
    	$('.form' ).insertAfter( '.tests' );
	}
	if($window.width() < 567){
		$('.form').insertAfter($(".tests__box")[testIndex]);
	}
	if($window.width() < 1000){
		if(testIndex == 0 || testIndex == 2){
			$('.form').insertAfter($(".tests__box")[testIndex+1]);
		}else{
			$('.form').insertAfter($(".tests__box")[testIndex]);
		}
	}

}
function showNextTest(){
	var nextTest = doneTests.indexOf(0);
	clearEverything();
	testIndex = nextTest;
	getTableData(testIndex);
  	$( '.form' ).first().show( 'fast', function showNext() {
  		$('.form').css('display', 'block');
    	$( this ).children( 'div' ).show( 'fast', showNext );
	});
	if($window.width() > 1000){
    	$('.form' ).insertAfter( '.tests' );
	}
	if($window.width() < 1000){
		if(testIndex == 0 || testIndex == 2){
			$('.form').insertAfter($(".tests__box")[testIndex+1]);
		}else{
			$('.form').insertAfter($(".tests__box")[testIndex]);
		}
	}
	if($window.width() < 567){
		$('.form').insertAfter($(".tests__box")[testIndex]);
	}
}
function showResults(){
	clearEverything();
	$('.analysis').append('<canvas id="myChart" width="350px" height="350px"></canvas>');
	var ctx = $("#myChart").get(0).getContext("2d");
	var data = {
		labels: ['1. küsimus', '2. küsimus', '3. küsimus', '4. küsimus', '5. küsimus', '6. küsimus', '7. küsimus'],
		datasets: [
		{
	    label: "Juht",
	    fillColor: "rgba(58,106,146,0.15)",
	    strokeColor: "rgba(58,106,146,1)",
	    pointColor: "rgba(58,106,146,1)",
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: "rgba(220,220,220,1)",
	    data: [results[0][2], results[0][3], results[0][4], results[0][5], results[0][6], results[0][7], results[0][8]]
    	},
    	{
	    label: "Kliendid",
	    fillColor: "rgba(0,71,130,0.15)",
	    strokeColor: "rgba(0,71,130,1)",
	    pointColor: "rgba(0,71,130,1)",
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: "rgba(220,220,220,1)",
	    data: [results[1][2], results[1][3], results[1][4], results[1][5], results[1][6], results[1][7], results[1][8]]
    	},
    	{
	    label: "Meeskond",
	    fillColor: "rgba(0,101,183,0.15)",
	    strokeColor: "rgba(0,101,183,1)",
	    pointColor: "rgba(0,101,183,1)",
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: "rgba(220,220,220,1)",
	    data: [results[2][2], results[2][3], results[2][4], results[2][5], results[2][6], results[2][7], results[2][8]]
    	},
    	{
	    label: "Protsessid",
	    fillColor: "rgba(88,109,128,0.15)",
	    strokeColor: "rgba(88,109,128,1)",
	    pointColor: "rgba(88,109,128,1)",
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: "rgba(220,220,220,1)",
	    data: [results[3][2], results[3][3], results[3][4], results[3][5], results[3][6], results[3][7], results[3][8]]
    	},
    	{
	    label: "Finantsid",
	    fillColor: "rgba(79,148,203,0.15)",
	    strokeColor: "rgba(79,148,203,1)",
	    pointColor: "rgba(79,148,203,1)",
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: "rgba(220,220,220,1)",
	    data: [results[4][2], results[4][3], results[4][4], results[4][5], results[4][6], results[4][7], results[4][8]]
    	},
    	
    ]
	};
	var myRadarChart = new Chart(ctx).Radar(data);
	$('.analysis').append('<div class="results">');
	$('.results').append('<input type="text" placeholder="Ettevõtte nimi" class="results__input result__input--fname">');
	$('.results').append('<input type="text" placeholder="Tegevusvaldkond" class="results__input result__input--ffield">');
	$('.results').append('<input type="text" placeholder="Ees- ja perekonnanimi" class="results__input result__input--name">');
	$('.results').append('<input type="text" placeholder="Telefon" class="results__input result__input--phone">');
	$('.results').append('<input type="text" placeholder="E-post" class="results__input result__input--email">');
	$('.results').append('<input type="submit" value="Saada tulemused" class="results__input results__submit">');
	$('.analysis').append('</div>');

	$('.results__submit').click(function(){
		fname = document.querySelector('.result__input--fname').value;
		ffield = document.querySelector('.result__input--ffield').value;
		name = document.querySelector('.result__input--name').value;
		phone = document.querySelector('.result__input--phone').value;
		email = document.querySelector('.result__input--email').value;
		saveContent();
	});
}
function saveContent(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var response = xmlhttp.responseText;
		}
	};

	xmlhttp.open('POST','./php/save.php',true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("f="+fname+"&ff="+ffield+"&n="+name+"&p="+phone+"&e="+email+"&r="+results+"&a="+answerAvg);
	console.log(fname);
	console.log(ffield);
	console.log(name);
	console.log(phone);
	console.log(email);
	console.log(results);
	console.log(answerAvg);

}