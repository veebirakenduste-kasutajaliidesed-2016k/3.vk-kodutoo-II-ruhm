<?php
require_once("config.php");
if(isset($_POST["name"])){
  addNumber($_POST["name"], $_POST["number"]);
}


function addNumber($create_name, $create_number){
  // globals on muutuja kõigist php failidest mis on ühendatud

$mysqli = new mysqli($GLOBALS["servername"], $GLOBALS["server_username"], $GLOBALS["server_password"], $GLOBALS["server_database"]);


  $stmt = $mysqli->prepare("INSERT INTO directory (name, phone) VALUES (?, ?)");
  $stmt->bind_param("ss", $create_name, $create_number);
  $stmt->execute();
  $stmt->close();

  $mysqli->close();
}
   ?>
