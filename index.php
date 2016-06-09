<!DOCTYPE html>
<html>
<html lang="en">
<head>
  <title>Welcome!</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<script src="jquery-1.12.4.min.js"></script>
<?php require_once("config.php"); ?>
<?php require_once("addnumb.php"); ?>

<body><center>
<h1>Search our Phone Directory</h1>
    <form id="searchform" method="post">
<div>
        <label for="search_term">Search name/phone</label>
        <input type="text" name="search_term" id="search_term"
          </form>
                  <button type="submit"  value="search" class="btn btn-primary" id="search_button" method="post">Search</button>
          </div>
              </form>
                <div id="search_results"></div>
                                  <script type='text/javascript'>
                                  $(document).ready(function(){
                                  $("#search_results").slideUp();
                                      $("#search_button").click(function(e){
                                          e.preventDefault();
                                          ajax_search();
                                      });
                                      $("#search_term").keyup(function(e){
                                          e.preventDefault();
                                          ajax_search();
                                      });

                                  });
                                  function ajax_search(){
                                    $("#search_results").show();
                                    var search_val=$("#search_term").val();
                                    $.post("./find.php", {search_term : search_val}, function(data){
                                     if (data.length>0){
                                       $("#search_results").html(data);
                                     }
                                    })
                                  }
                                  </script>




                                  <h1>Add new number</h1>

                                   <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" >
                                   	<label>Nimi</label><br>
                                 	<input name="car_plate" type="text" value="<?=$create_name; ?>"> <br><br>
                                   	<label>number</label><br>
                                 	<input name="color" type="text" value="<?=$create_number; ?>"> <br><br>
                                   	<input type="submit" name="create" value="Salvesta">
                                   </form>
</body>
</html>
