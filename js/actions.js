$(function() {
  $('#search_value').submit(function(event) {
    event.preventDefault();
    $('li').remove('');
    var searchValue = $('#query').val();
	$('#body_container').css('opacity', '1');
    getResults(searchValue);
  });

  function getResults(searchValue) {
	  var Token;
    $.getJSON('https://www.googleapis.com/youtube/v3/search',{
        part: 'snippet',
        key: 'AIzaSyCjyPXRl8Wn8HYwwJIyvmJlX8OPL6-PcP4',
        maxResults: 10,
        type: 'video',
        q: searchValue},
        function(results){
          $.each(results.items, function(i, data){
            //console.log(data);
            showResults(data);
          });
        }
    )
  }
  
  //$( "#prevBtn" ).click(function(searchValue) {
//});

  function showResults(data) {
    var output;
    var iframe;
    var vidPlayLink;
    $.each(data, function(index, value) {
      var vidTitle = data.snippet.title;
      var vidID = data.id.videoId;
      var vidThumb = data.snippet.thumbnails.default.url;

      vidPlayLink = 'https://www.youtube.com/embed/'+vidID;

      var link = '<p><a href ="#"><img src='+ vidThumb +'></a></p><p>'+vidTitle+'</p>';
      output = '<li>'+link+'</li>';
    });

    $('#search_results ul').append(output);
    $('li').click(function(event) {
      $('#iframe_container').html(('<iframe src="'+vidPlayLink+'" frameborder="0" allowfullscreen></iframe>'));
      event.preventdefault();
    });
  }


});
