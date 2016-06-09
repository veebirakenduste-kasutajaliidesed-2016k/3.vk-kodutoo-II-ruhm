<?php
require_once("config.php");

$connect = mysql_connect($servername,$server_username,$server_password)
or die('Could not connect to mysql server.' );

mysql_select_db($server_database, $connect)
or die('Could not select database.');
