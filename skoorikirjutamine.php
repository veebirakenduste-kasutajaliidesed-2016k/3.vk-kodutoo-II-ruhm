<?php
$myfile = fopen("skoor.txt", "w") or die("Unable to open file!");
$txt = $_GET["uid"];
fwrite($myfile, $txt);
fclose($myfile);
?>
