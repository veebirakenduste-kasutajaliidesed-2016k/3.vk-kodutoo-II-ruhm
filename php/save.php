<?php
	function jsonRemoveUnicodeSequences($struct) {
   		return preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($struct));
	}
	
	$entries = array();
	$file_name = "stats.txt";
	$date = date("d-m-o G:i:s");
	$entries_from_file = file_get_contents($file_name);
	$entries = json_decode($entries_from_file);
	if(isSet($_REQUEST["n"]) && $_REQUEST["n"] !=""){
		if ($entries_from_file == "null"){
			$entries = array();
		}
			$e = new StdClass();
			$e-> fname = $_REQUEST["f"];
			$e-> ffield = $_REQUEST["ff"];
			$e-> name = $_REQUEST["n"];
			$e-> phone = $_REQUEST["p"];
			$e-> email = $_REQUEST["e"];
			$e-> results = $_REQUEST["r"];
			$e-> avg = $_REQUEST["a"];
			$e-> date = $date;
			array_push($entries, $e);
	}
	echo $date; 
	file_put_contents($file_name, jsonRemoveUnicodeSequences($entries));
?>