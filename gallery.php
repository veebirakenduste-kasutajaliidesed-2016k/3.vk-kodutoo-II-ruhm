<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

  <script src="gallery.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
</head>
<body>


  <nav class="navbar navbar-inverse">
    <a class="navbar-brand" href="gallery.php">Galerii</a>
    <ul class="nav navbar-nav">
      <li><a id="upload-img">Upload</a></li>
    </ul>
  </nav>


  <div id="dialog" title="Lae pilt üles">
    <?php include("upload.php"); ?>

  </div>


  <div id="gallery-img" class="row">

  </div>

</body>
</html>
