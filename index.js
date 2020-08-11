var baseArray=[];
var clickPat=[];
var gameOver=false;
var gameLevel=0;
var score=0;
//Make Sound Func
function makesSound(key)
{   
   switch (key) {
      case "1":
         var audio=new Audio(".sounds/yellow.mp3");
         audio.play();
         break;
      case "3":
         var audio=new Audio(".sounds/red.mp3");
         audio.play();
         break;
      case "4":
         var audio=new Audio(".sounds/green.mp3");
         audio.play();
         break;
      case "2":
         var audio=new Audio(".sounds/blue.mp3");
         audio.play();
         break;
      default:
         break;
   }
}
//check user browser
function detectUser()
{
   if(navigator.userAgent.match(/Android/i)
   ||navigator.userAgent.match(/webOS/i)
   ||navigator.userAgent.match(/iPhone/i)
   ||navigator.userAgent.match(/iPad/i)
   ||navigator.userAgent.match(/iPod/i)
   ||navigator.userAgent.match(/BlackBerry/i)
   ||navigator.userAgent.match(/Windows Phone/i))
   {
      return true;
   }else return false;
}

//add Animation
function buttonAnimation(pressedKey)
{
   switch (pressedKey) {
      case "1":
         $(".yellow").addClass("pressed");
         setTimeout(() => {
            $(".yellow").removeClass("pressed");
         },200);
         break;
      case "2":
         $(".blue").addClass("pressed");
         setTimeout(() => {
            $(".blue").removeClass("pressed");
         },200);
         break;
      case "3":
            $(".red").addClass("pressed");
         setTimeout(() => {
            $(".red").removeClass("pressed");
         },200);
         break;
      case "4":
            $(".green").addClass("pressed");
         setTimeout(() => {
            $(".green").removeClass("pressed");
         },200);
         break;
      default:
         break;
   }
}

//add Blink
function buttonBlink(number)
{
   switch (number) {
      case 1:
         $(".yellow").fadeOut(100).fadeIn(100);
         break;
      case 3:
         $(".red").fadeOut(100).fadeIn(100);
         break;
      case 2:
         $(".blue").fadeOut(100).fadeIn(100);
         break;
      case 4:
         $(".green").fadeOut(100).fadeIn(100);
         break;
      default:
         break;
   }
}

//generateRandom
function randomColor()
{
   var randomNumber=Math.floor(Math.random()*4+1);
   baseArray.push(randomNumber);
}

//Start
function startGame()
{
   clickPat=[];

   $("h1").html(`Level ${gameLevel}`);
   $("h2").show();
   randomColor();
   buttonBlink(baseArray[gameLevel]);
   makesSound(baseArray[gameLevel].toString());
}

//Handle Something 
function checkAnswer(currentArrLength)
{
   if(baseArray[currentArrLength]===clickPat[currentArrLength])
   {
      
      if(clickPat.length===baseArray.length)
      {
         score+=100*(gameLevel+1);
         $("h2").html("Score: "+score);
         gameLevel+=1;
         setTimeout(function () {
            startGame();
          }, 1000);
      }
   }else{
      
      gameOverFunc();
   }
   
}

//Handle GameOver
function gameOverFunc()
{
   $("h2").html("Score: 0");
   $("h2").hide();
   $("body").addClass("gameOver");
      var audio=new Audio("/sounds/wrong.mp3");
      audio.play();
      setTimeout(function ()
      { 
         $("body").removeClass("gameOver");
      },500);
   gameOver=true;
   gameLevel=0;
   baseArray=[];
   if(detectUser()!=true)
   {
      $("h1").html("Your score: "+score+ "<br> Press A to play again.");
   }else $("h1").html("Your score: "+score+ "<br> Play again")
   score=0;
}
//
$("button").click(function()
   {
      if(gameOver!=true)
      {
         var textKey=this.innerHTML;
         makesSound(textKey);
         buttonAnimation(textKey);
         var keyPut=this.innerHTML;
         clickPat.push(Number(keyPut));
         checkAnswer(clickPat.length-1);
      }
   });
//on
$(document).keypress(function (e) { 
   if(e.key=="a")
   {
      gameOver=false;
      startGame();
   }
});

   

if(detectUser()==true)
{
   $("h1").html("➡Start⬅");
   $("button").removeClass("simon-button");
   $("button").addClass("phoneDetect");
   $("h1").click(function()
   {
      gameOver=false;
      startGame();
   })
}
