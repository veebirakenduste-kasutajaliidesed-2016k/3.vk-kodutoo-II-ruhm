var response, response_array, html;
var x = 0;
var fnames = [];
var ffields = [];
var names =[];
var phones = [];
var emails = [];
var results = [];
var avgs = [];
var dates = []
var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		// Sai faili tervenisti kätte
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			// faili sisu
			response = xmlhttp.responseText;
			response_array = JSON.parse(response);
			//console.log(response_array);
			createTable();
		}
	};
	xmlhttp.open('GET','./php/stats.txt',true);
	xmlhttp.send();


function createTable(){
	for(var i = 0; i<response_array.length; i++){
		fnames.push(response_array[i].fname);
	}
	for(var i = 0; i<response_array.length; i++){
		ffields.push(response_array[i].ffield);
	}
	for(var i = 0; i<response_array.length; i++){
		names.push(response_array[i].name);
	}
	for(var i = 0; i<response_array.length; i++){
		phones.push(response_array[i].phone);
	}
	for(var i = 0; i<response_array.length; i++){
		emails.push(response_array[i].email);
	}
	for(var i = 0; i<response_array.length; i++){
		results.push(response_array[i].results);
	}
	for(var i = 0; i<response_array.length; i++){
		avgs.push(response_array[i].avg);
	}
	for(var i = 0; i<response_array.length; i++){
		dates.push(response_array[i].date);
	}

	html = "<input class='search' placeholder='Search' /><table border=1><thead><th class='sort' data-sort='list--fname'>Firma nimi</th><th class='sort' data-sort='list--ffield'>Firma tegevusvaldkond</th><th class='sort' data-sort='list--name'>Nimi</th><th class='sort' data-sort='list--phone'>Telefoni number</th><th class='sort' data-sort='list--email'>Email</th><th>Tulemused</th><th>Keskmised tulemused</th><th class='sort' data-sort='list--date'>Kuupäev</th></thead><tbody class='list'>";
	for(var a = 0; a <response_array.length; a++){
		html+=	"<tr>"+
					"<td class='list--fname'>"+fnames[a]+"</td>"+
					"<td class='list--ffield'>"+ffields[a]+"</td>"+
					"<td class='list--name'>"+names[a]+"</td>"+
					"<td class='list--phone'>"+phones[a]+"</td>"+
					"<td class='list--email'>"+emails[a]+"</td>"+
					"<td class='list--result'>"+results[a]+"</td>"+
					"<td class='list--avg'>"+avgs[a]+"</td>"+
					"<td class='list--date'>"+dates[a]+"</td>"+
				"</tr>";
	}

	html += "</tbody></table>";
	//document.getElementsByTagName("body")[0].innerHTML = html;
	$('#users').append(html);
	
	var options = {
	  valueNames: [ 'list--fname', 'list--ffield', 'list--name', 'list--phone', 'list--email', 'list--result', 'list--avg', 'list--date' ]
	};

	var userList = new List('users', options);

}