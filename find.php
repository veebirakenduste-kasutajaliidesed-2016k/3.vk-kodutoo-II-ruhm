<?php
require_once("config.php");

$connect = mysql_connect($servername,$server_username,$server_password)
or die('Could not connect to mysql server.' );

mysql_select_db($server_database, $connect)
or die('Could not select database.');

$term = strip_tags(substr($_POST['search_term'],0, 100));
$term = mysql_escape_string($term);

$sql = "select name,phone
from directory
where name like '%$term%'
or phone like '%$term%'
order by name asc";

$result = mysql_query($sql);

$string = '';

if (mysql_num_rows($result) > 0){
  while($row = mysql_fetch_object($result)){
    $string .= "<b>".$row->name."</b> - ";
    $string .= $row->phone."</a>";
    $string .= "<br/>\n";
  }

}else{
  $string = "No matches!";
}

echo $string;
?>
