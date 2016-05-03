<?php

	$file_name = "data.txt";
	
	$entries_from_file = file_get_contents($file_name);
	
	//massiiv olemasolevate sissekannetega
	$entries = json_decode($entries_from_file);
	
	if(isset($_GET["name"]) && !empty($_GET["name"])){
		
		//salvestan juurde
		$object = new StdClass();
		$object->name = $_GET["name"];
		
		
		//Lisan massiivi juurde
		array_push($entries, $object);
		
		//teen stringiks
		$json = json_encode($entries);
		
		//salvestan
		file_put_contents($file_name, $json);
	}
	

	
	var_dump($entries);


?>