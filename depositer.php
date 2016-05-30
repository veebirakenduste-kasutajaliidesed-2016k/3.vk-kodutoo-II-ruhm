<?php

if ( ! isset( $_POST["amount"] ) ) {
	return;
}

$content = $_POST["amount"];

$file = file_get_contents( "transactions.txt" );
$content = $content . ';' . date('l jS \of F Y h:i:s A') . ';' . "\n" . $file;

file_put_contents("transactions.txt",$content);