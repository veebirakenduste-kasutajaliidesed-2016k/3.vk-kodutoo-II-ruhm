<?php

	$file_name = "data.txt";
	
	$entries_from_file = file_get_contents($file_name);
	
	//massiiv olemasolevate sissekannetega
	$entries = json_decode($entries_from_file);
	
	if(isset($_GET["name"]) && !empty($_GET["name"])){
		
		//salvestan juurde
		$object = new StdClass();
		$object->id = $_GET["name"];
		
		
		//Lisan massiivi juurde
		array_push($entries, $object);
		
		//teen stringiks
		$json = json_encode($entries);
		
		//salvestan
		file_put_contents($file_name, $json);
	}
	
	if(isset($_GET["delete"]) && !empty($_GET["delete"])){


    for($i=0; $i<sizeof($entries); $i++){
      if($_GET["delete"] == $entries[$i]->id){
        unset($entries[$i]);

      }
    }
    file_put_contents($file_name, json_encode($entries));
  }

  echo(json_encode($entries));
	
	var_dump($entries);


?>