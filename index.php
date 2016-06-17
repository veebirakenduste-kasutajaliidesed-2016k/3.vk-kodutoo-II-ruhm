<!DOCTYPE html>
<?=
$create_name = "";
$create_number = "";
require_once("addnumb.php");
 ?>
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

<body><center>
<h1>Search our Phone Directory</h1>
    <form id="searchform" method="post">
<div>
        <label for="search_term">Search name/phone</label>
        <input type="text" name="search_term" id="search_term"
          </form>
                <input type="submit"  value="search" id="search_button" class="btn btn-primary"/>
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
                                  	<input name="name" type="name" placeholder="name" value="<?php echo $create_name; ?>"><br><br>
                                  	<input name="number" type="number" placeholder="number" value="<?php echo $create_number; ?>"><br><br>
                                  	<input type="submit" name="create" value="lisa">
                                  </form>

</body>
</html>
