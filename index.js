window.onload=function(){
  document.getElementById('load').addEventListener('click', loadfile);
};

function loadfile() {
  console.log("laen .txt failist teksti ja kuvan pildi");
  document.getElementById('pilt').style.visibility = 'visible';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("loadtext").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "data.txt", true);
  xhttp.send();
}
