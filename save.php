<?php

  $file_name= "data.txt";

  $entries_from_file = file_get_contents($file_name);

  //massiiv olemasolevate
  $entries = json_decode($entries_from_file);

  /*&& isset($_GET["clicks"]) && isset($_GET["time"]) &&  !empty($_GET["clicks"]) && !empty($_GET["time"])*/

  if(isset($_GET["name"]) && isset($_GET["clicks"]) && isset($_GET["time"]) && !empty($_GET["name"]) &&  !empty($_GET["clicks"]) && !empty($_GET["time"])){

	  //salvestan juurde
	  $object = new StdClass();
	  $object->name = $_GET["name"];
    $object->clicks = $_GET["clicks"];
    $object->time = $_GET["time"];



	  //lisan massiiivi juurde
	  array_push($entries, $object);

	  //teen stringiks
	  $json = json_encode($entries);

	  //salvestan
	  file_put_contents($file_name, $json);

  }



  //var_dump($entries);
	echo(json_encode($entries));



?>
