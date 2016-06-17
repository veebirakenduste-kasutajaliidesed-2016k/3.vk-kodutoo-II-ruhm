<?php

function addNumber($create_name, $create_number){
  // globals on muutuja kõigist php failidest mis on ühendatud

  $mysqli = new mysqli($GLOBALS["servername"], $GLOBALS["server_username"], $GLOBALS["server_password"], $GLOBALS["database"]);

  $stmt = $this->connection->prepare("INSERT INTO directory (name, phone) VALUES (?, ?)");
  $stmt->bind_param("ss", $create_name, $create_number);
  $stmt->execute();
  $stmt->close();

  $mysqli->close();
}
   ?>
