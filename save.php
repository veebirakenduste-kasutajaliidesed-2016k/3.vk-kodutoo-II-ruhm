<?php

	$file_name = "data.txt";
	
	$entries_from_file = file_get_contents($file_name);
	
	//massiiv olemasolevate sissekannetega
	$entries = json_decode($entries_from_file);
	
	if(isset($_GET["id"]) && (isset($_GET["title"])) && isset($_GET["team_1"]) && isset($_GET["team_2"]) && isset($_GET["result_1"]) && isset($_GET["result_2"]) && !empty($_GET["id"]) && (!empty($_GET["title"])) && !empty($_GET["team_1"]) && !empty($_GET["team_2"]) && !empty($_GET["result_1"]) && !empty($_GET["result_2"])){
		
		//salvestan juurde
		$object = new StdClass();
		$object->id = $_GET["id"];
		$object->title = $_GET["title"];
		$object->team_1 = $_GET["team_1"];
		$object->team_2 = $_GET["team_2"];
		$object->result_1 = $_GET["result_1"];
		$object->result_2 = $_GET["result_2"];
		
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