var apiurl,myresult,apiurl_size,selected_size,popularurl;
apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=94268cb7e8c14262f02a71d8bc2e59b1&per_page=10&format=json&nojsoncallback=1";
popularurl= "https://api.flickr.com/services/rest/?method=flickr.stats.getPopularPhotos&api_key=94268cb7e8c14262f02a71d8bc2e59b1&per_page=10&format=json&nojsoncallback=1";
$(document).ready(function(){
$("#sq").click(function(){
selected_size=75;
})
});
$(document).ready(function(){
$("#lg-sq").click(function(){
selected_size=150;
})
});
$(document).ready(function(){
$("#thumb").click(function(){
selected_size=100;
})
});
$(document).ready(function(){
$("#small").click(function(){
selected_size=240;
})
});
$(document).ready(function(){
$("#mid").click(function(){
selected_size=500;
})
});
$(document).ready(function(){
$("#ori").click(function(){
selected_size=640;
})
});
$(document).ready(function(){
$('#button').click(function(){
$.getJSON(apiurl,function(json) {
$.each(json.photos.photo,function(i,myresult){
apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id="+myresult.id+"&format=json&nojsoncallback=1";
$.getJSON(apiurl_size,function(size){
$.each(size.sizes.size,function(i,myresult_size){
if(myresult_size.width==selected_size){
$("#results").append('<p><a href="'+myresult_size.url+'" target="_blank"><img src="'+myresult_size.source+'"/></a></p>');
}
})
})
});
});
});
});
