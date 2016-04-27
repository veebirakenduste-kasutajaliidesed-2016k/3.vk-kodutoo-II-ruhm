var sumName = "";
var APIKEY = "";

function summonerLookUp() {
    sumName = $("#summonerName").val();
    APIKEY = $("#APIKey").val();


    if (sumName !== "") {
        $.ajax({
            url: 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + sumName + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var sumNameNoSpace = sumName.replace(" ", "");

                var i = 0, sumNameLength = sumName.length;

                for(i; i < sumNameLength; i++) {
                  sumName = sumName.replace(" ", "");
                }


                sumNameNoSpace = sumName.toLowerCase().trim();
                summonerLevel = json[sumNameNoSpace].summonerLevel;
                summonerID = json[sumNameNoSpace].id;

                window.sumNameNoSpace = sumNameNoSpace;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;

                letsGetMasteries(summonerID);
                window.summonerID = summonerID;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Error getting data!");
            }
        });
    } else {}
}

function letsGetMasteries(summonerID) {
    var season = "SEASON2016"; //SEASON3, SEASON2014, SEASON2015, SEASON2016
    $.ajax({
        url: "https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/" + summonerID + "/summary?season=" + season + "&api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp){
                for (var i = 0; i < resp.playerStatSummaries.length; i++){
                  var summary = resp.playerStatSummaries[i];

                  if (summary.playerStatSummaryType == 'Unranked'){
                    kills = resp.playerStatSummaries[i].aggregatedStats.totalChampionKills;
                    assists = resp.playerStatSummaries[i].aggregatedStats.totalAssists;
                    turrets = resp.playerStatSummaries[i].aggregatedStats.totalTurretsKilled;
                    minions = resp.playerStatSummaries[i].aggregatedStats.totalMinionKills;
                    neutralMinions = resp.playerStatSummaries[i].aggregatedStats.totalNeutralMinionsKilled;
                    wins = resp.playerStatSummaries[i].wins;

                    document.getElementById("sKills").innerHTML = kills;
                    document.getElementById("sAssists").innerHTML = assists;
                    document.getElementById("sTowers").innerHTML = turrets;
                    document.getElementById("sMinions").innerHTML =  minions;
                    document.getElementById("sNeutralMinions").innerHTML =  neutralMinions;
                    document.getElementById("sWins").innerHTML =  wins;

                  }else if (summary.playerStatSummaryType == 'RankedSolo5x5'){
                    rankedWins = resp.playerStatSummaries[i].wins;
                    rankedLosses = resp.playerStatSummaries[i].losses;
                    ratio = Math.round((rankedWins/(rankedWins+rankedLosses)*100)*100/100);
                    ratio = +((rankedWins/(rankedWins+rankedLosses)*100)*100/100).toFixed(2);
                    ratio = ratio + "%";

                    rankedWinPercentage = ratio;

                    document.getElementById("rWins").innerHTML =  rankedWins;
                    document.getElementById("rLosses").innerHTML =  rankedLosses;
                    document.getElementById("wlRatio").innerHTML =  ratio;

                  }else if (summary.playerStatSummaryType == 'AramUnranked5x5'){
                      aramKills = resp.playerStatSummaries[i].aggregatedStats.totalChampionKills;
                      aramAssists = resp.playerStatSummaries[i].aggregatedStats.totalAssists;
                      aramTurrets = resp.playerStatSummaries[i].aggregatedStats.totalTurretsKilled;
                      aramWins = resp.playerStatSummaries[i].wins;

                      document.getElementById("aKills").innerHTML = aramKills;
                      document.getElementById("aAssists").innerHTML = aramAssists;
                      document.getElementById("aTurrets").innerHTML = aramTurrets;
                      document.getElementById("aWins").innerHTML =  aramWins;
                  }
                }
                winsPercentage = (Math.round(wins/(rankedWins+aramWins+wins)*100)*100/100);
                rankedPercentage = (Math.round(rankedWins/(rankedWins+aramWins+wins)*100)*100/100);
                aramPercentage = (Math.round(aramWins/(rankedWins+aramWins+wins)*100)*100/100);
                killsMean = (aramKills+kills)/2;
                assistsMean = (aramAssists+assists)/2;
                turretsMean = (aramTurrets+turrets)/2;
                winsMean = (aramWins+wins)/2;
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error getting data!");
        }
    });
}

function drawGraph () {
  document.getElementById("chartContainer").style.display = "block";
	var chart = new CanvasJS.Chart("chartContainer", {
		theme: "theme2",
		title:{
			text: "Stats in normal Summoner's Rift"
		},
		animationEnabled: true,
		data: [
		{
			type: "column",
			dataPoints: [
				{ label: "kills",  y: window.kills  },
				{ label: "assists", y: window.assists  },
				{ label: "turrets", y: window.turrets  },
				{ label: "minions",  y: window.minions  },
        { label: "neutral minions",  y: window.neutralMinions  },
				{ label: "wins",  y: window.wins  }
			]
		}
		]
	});
	chart.render();

if(window.rankedWins !== 0 || window.rankedLosses !== 0){
  document.getElementById("chartContainer2").style.display = "block";
  var chart2 = new CanvasJS.Chart("chartContainer2", {
		theme: "theme2",
		title:{
			text: "Stats in ranked Summoner's Rift"
		},
		animationEnabled: true,
		data: [
		{
			type: "pie",
			dataPoints: [
				{ label: "wins",  y: window.rankedWins  },
				{ label: "losses",  y: window.rankedLosses  },
			]
		}
		]
	});
	chart2.render();

}else{
  document.getElementById("chartContainer2").style.display = "none";
}
  document.getElementById("chartContainer3").style.display = "block";
  var chart3 = new CanvasJS.Chart("chartContainer3", {
		theme: "theme2",
		title:{
			text: "Stats in ARAM"
		},
		animationEnabled: true,
		data: [
		{
			type: "column",
			dataPoints: [
        { label: "kills",  y: window.aramKills  },
				{ label: "assists", y: window.aramAssists  },
				{ label: "turrets", y: window.aramTurrets  },
				{ label: "wins",  y: window.aramWins  }
			]
		}
		]
	});
	chart3.render();

  document.getElementById("chartContainer4").style.display = "block";
  var chart4 = new CanvasJS.Chart("chartContainer4", {
		theme: "theme2",
		title:{
			text: "Which gamemode most likely to play?"
		},
		animationEnabled: true,   // change to true
		data: [
		{
			type: "pie",
      indexLabel: "#percent%",
			dataPoints: [
				{ label: "normal", y: window.winsPercentage  },
				{ label: "ranked", y: window.rankedPercentage  },
				{ label: "ARAM",  y: window.aramPercentage  }
			]
		}
		]
	});
	chart4.render();

  document.getElementById("chartContainer5").style.display = "block";
  var chart5 = new CanvasJS.Chart("chartContainer5",
    {
      theme:"theme2",
      title:{
        text: "Normal and ARAM stats"
      },
      animationEnabled: true,
      toolTip: {
        shared: "true"
      },
      data: [
      {
        type: "column",
        showInLegend: true,
        name: "Normal",
        dataPoints: [
        {label: "Kills", y: window.kills},
        {label: "Assists", y: window.assists},
        {label: "Turrets", y: window.turrets},
        {label: "Wins", y: window.wins}

        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "ARAM",
        dataPoints: [
        {label: "Kills", y: window.aramKills},
        {label: "Assists", y: window.aramAssists},
        {label: "Turrets", y: window.aramTurrets},
        {label: "Wins", y: window.aramWins}

        ]
      },
      {
        showInLegend: true,
        name: "Normal and ARAM combined means",
        type: "spline",
        dataPoints: [
          { label: "kills",  y: window.killsMean  },
          { label: "assists", y: window.assistsMean  },
          { label: "turrets", y: window.turretsMean  },
          { label: "wins",  y: window.winsMean  }
        ]
      }
      ],
      legend:{
        cursor:"pointer",
        itemclick : function(e) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
          	e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          chart5.render();
        }

      },
    });

chart5.render();

}

function writeToJSON(){
  winsSum = window.wins + window.rankedWins + window.aramWins;
  var data = {};

  data.summonerName = sumNameNoSpace;
  data.summonerID = summonerID;
  data.winsSum = winsSum;
  data.rankedWinPercentage = rankedWinPercentage;
  data.killsMean = killsMean;
  data.assistsMean = assistsMean;
  data.turretsMean = turretsMean;
  data.winsMean = winsMean;
  console.log(JSON.stringify(data));
}

  function ajax_post(){
    var hr = new XMLHttpRequest();
    var url = "exportDataToPHP.php";
	  var leagueSummonerName = sumNameNoSpace;
    var leagueSummonerID = summonerID;
	  var leagueSummonerWinsSum = window.winsSum;
    var leagueSummonerRankedWinPercentage = rankedWinPercentage;
	  var vars = "leagueSummonerName="+leagueSummonerName+"&leagueSummonerID="+leagueSummonerID+"&leagueSummonerWinsSum="+ leagueSummonerWinsSum+"&leagueSummonerRankedWinPercentage="+leagueSummonerRankedWinPercentage;
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    var return_data = hr.responseText;
	    }
    };
    hr.send(vars);
}
