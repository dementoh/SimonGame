var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var scored=0;
//random function
function randomNum(max) {
    return Math.floor(Math.random() * max);
}
// Button fade
function fadeButton(rdColor) {
    $("#" + rdColor)
        .fadeOut(100)
        .fadeIn(100);
}

//play sound
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    $("#score-title").text("Score: " + scored);
    var randomNumber = randomNum(4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    fadeButton(randomChosenColor);
    playSound(randomChosenColor);
       
    

}
function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 50);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        $("#score-title").text("Score: " + scored);
        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function () { nextSequence(); } , 1000);
            scored+=50*level;
        }
    }
    else {
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");  
            $("#level-title").text("Game Over, Press Any Key to Restart");
            
        },200);
        startOver();
    }
}
function startOver()
{
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=false;
    scored=0;
}

$(document).on("keydown", function () {
    if (started != true) {
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    if(started===true)
    {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePressed(userChosenColor);
    
        checkAnswer(userClickedPattern.length - 1);
    }
    

});

//Hold random color
