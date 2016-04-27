<?php
$summonerName = $_POST['leagueSummonerName'];
$summonerID = $_POST['leagueSummonerID'];
$winsSum = $_POST['leagueSummonerWinsSum'];
$rankedWinPercentage = $_POST['leagueSummonerRankedWinPercentage'];

$filename = $batch_id."log.txt";
$handle = fopen($filename, "a");
fwrite($handle, "$summonerName $summonerID $winsSum $rankedWinPercentage\n");
fclose($filename);
?>
