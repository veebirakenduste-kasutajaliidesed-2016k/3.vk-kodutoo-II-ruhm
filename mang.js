var lastSelected;
var score = 0;
var boxopened = "";
var imgopened = "";
var num = 0;
var moves = 0;
function startGame() {
    $("div.row div img").addClass('hidden');
    addImg();
    click();
    check();
    shuffle();


};

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
    var children = $("#boxcard").children();
    var child = $("#boxcard div:first-child");

    var array_img = new Array();

    for (i = 0; i < children.length; i++) {
        array_img[i] = $("#" + child.attr("id") + " img").attr("src");
        child = child.next();
    }

    var child = $("#boxcard div:first-child");

    for (z = 0; z < children.length; z++) {
        randIndex = randomFromTo(0, array_img.length - 1);

        // set new image
        $("#" + child.attr("id") + " img").attr("src", array_img[randIndex]);
        array_img.splice(randIndex, 1);

        child = child.next();
    }
}


function check(el) {

    if ($(lastSelected).attr("src") == $(el).find("img").attr("src") && $(lastSelected).hasClass("visible")) {
        score = 0 + 2;
        alert("Congradulation! You scored!!" + " " + score + " Points");
    }

    lastSelected = $(el).find("img");
    clearAll();

}


function click() {

    var boxes = $(".row img").size();
    $(".row div").click(function () {
        moves++;
        $(".totalmoves").html(moves);
        $(".cover").css({
            "z-index": "9999"
        });
        $(this).children("img").animate({
            "opacity": "1"
        }, function () {
            num++;
            var id1 = $("img.selected").attr("src");
            var id2 = $(this).attr("src");
            $(this).addClass("selected");

            if (num == 2) {
                num = 0;
                if (id1 == id2) {
                    $(".selected").removeClass("selected");
                    score = score + 2;
                    alert("Congradulation! You scored!!" + " " + score + " Points");
                    boxes = boxes - 2;
                    if (boxes == 0) {
                        alert("Game Over Your Total Score is :" + score + " Points");
                    }

                    $(".yourscore").html(score);
                } else {
                    speed = 100;
                    $(".selected").animate({
                        "opacity": "0"
                    }, 400, function () {
                        $(".selected").removeClass("selected");
                        if (score > 1) {
                            score = score - 0.5;
                            $(".yourscore").html(score);
                        }
                    });
                }
            } else {
                speed = 100;
            }

            $(this).animate({
                "padding": "0.1"
            }, speed, function () {
                $(".cover").css({
                    "z-index": "-9999"
                });
            });
        });

    });


};

// add Random Images
function addImg() {

    var images = ["https://www.google.ee/search?q=cars&biw=1366&bih=667&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi_uc2Hx-HMAhWCOSwKHdZdDgYQ_AUIBigB#imgrc=dYYXYWTp5VriVM%3A", "https://www.google.ee/search?q=cars&biw=1366&bih=667&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi_uc2Hx-HMAhWCOSwKHdZdDgYQ_AUIBigB#imgrc=skcaZHT7BHLZqM%3A", "http://courses.oreillyschool.com/jquery/QuizzesAndProjects/images/kitchen_blender.gif", "http://courses.oreillyschool.com/jquery/QuizzesAndProjects/images/tea.gif", "https://www.google.ee/search?q=cars&biw=1366&bih=667&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi_uc2Hx-HMAhWCOSwKHdZdDgYQ_AUIBigB#tbm=isch&q=jaguar+f+type&imgrc=Fktd958PZkuz-M%3A", "https://www.google.ee/search?q=cars&biw=1366&bih=667&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi_uc2Hx-HMAhWCOSwKHdZdDgYQ_AUIBigB#tbm=isch&q=jaguar+f+type&imgdii=Fktd958PZkuz-M%3A%3BFktd958PZkuz-M%3A%3Bq75yUxlWn1Ze7M%3A&imgrc=Fktd958PZkuz-M%3A"];

    var imagesused = [];
    $('.container div:not(.row)').each(function () {
        var rand = Math.floor(Math.random() * images.length);
        $(this).append('<img src="' + images[rand] + '"/>');
        if (imagesused.indexOf(images[rand]) != -1) images.splice(rand, 1);
        else imagesused.push(images[rand]);
        console.log(images);

    });
}
// Clear the images Button
var clearAll = function () {
    $(':button').click(function () {
        score = 0;
        $(".yourscore").html(score);
        moves = 0;
        $(".totalmoves").html(moves);
        $(".selected").removeClass("selected");
        $(".row img").animate({
            "opacity": "0"
        }, function () {
            $(".row img").remove();
            addImg();

        });




    });

};
