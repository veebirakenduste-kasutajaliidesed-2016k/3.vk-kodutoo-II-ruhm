//dragable elemendid pärit: jqueryui.com/sortable/#default
 $(function() {
   $( "#sortable" ).sortable();
   $( "#sortable" ).disableSelection();
 });

//autocomplete pärit: jqueryui.com/autocomplete
 $(function() {
   var availableTags = [
//// A
     "Apelsin",
     "Ananass",
     "Austrid",
//// B
     "Banaan",
     "Basiilik",
     "Besee",
//// D
     "Datlid",
//// E

//// F
     "Forell",
//// G
     "Greip",
//// H
     "Halvaa",
     "Hapukoor",
     "Hirss",
//// I
     "Iirisekommid",
//// J
     "Juust",
     "Jahu",
     "Jogurt",
//// K
     "Kartul",
     "Kapsas",
     "Küpsised",
     "Kiivid",
//// L
     "Liköör",
//// M
     "Makaronid",
     "Müsli",
     "Munad",
     "Mahl",
//// N
     "Naeris",
//// O
     "Oliivid",
     "Oad",
//// P
     "Piim",
     "Ploomid",
     "Petersell",
     "Puder",
     "Porgand",
//// R
     "Redis",
//// S
     "Suhkur",
     "Sool",
     "Sai",
     "Sepik",
     "Seller",
     "Sink",
     "Sardell",
//// Š
     "Šokolaad",
//// T
     "Tatar",
     "Till",
     "Tort",
//// U

//// V
     "Vorst",
     "Vesi",
     "Viiner",
     "Või",
     "Vahvlid",
     "Vein",
     "Viin",
//// W
     "WC paber",
//// Õ
     "Õlu",
     "Õun"
//// Ä

//// Ö

//// Ü

   ];
   $( "#tags" ).autocomplete({
     source: availableTags
   });
 });
