var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = 0;
$("#level-title").text("Touch Here To Start Game");
$("h1").click(function() {
  if (start === 0) {
    $("h1").text("Level " + level);
    setTimeout(nextSequence(), 2000);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Touch Here To Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChoosenColor)
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
  audio.play();
  level++
  $("h1").text("Level " + level)
  start = 1;
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  // for (i = 0; i < level; i++) {
  //   console.log(userClickedPattern[i]);
  checkAnswer(userClickedPattern.length - 1);
  // }
});

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor) {
  $("." + currentcolor).addClass("pressed");
  setTimeout(function() {
    $("." + currentcolor).removeClass("pressed");
  }, 100);
}

function startOver() {
  start = 0;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}
