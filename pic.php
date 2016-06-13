<?php

  $file_name= "data.txt";

  $entries_from_file = file_get_contents($file_name);

  $entries = json_decode($entries_from_file);

  echo(json_encode($entries));



?>
