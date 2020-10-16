let questionNumber = 0;
var stage = "#currQuestion";
var stage2 = new Object();
var questionLock = false;
var score = 0;

function displayQuestion(questionBank) {
  firstClick = true;
  let noOfQuestions = questionBank.length;
  shuffleArray(questionBank[questionNumber]);

  q1 = questionBank[questionNumber].options[0];
  q2 = questionBank[questionNumber].options[1];
  q3 = questionBank[questionNumber].options[2];

  $(stage).append(
    '<div  class="question" id ="questionText">' +
      questionBank[questionNumber].question +
      "</div><div id=" +
      q1 +
      ' class="options" ><img src="img/' +
      q1 +
      ".jpg" +
      '"width="180px" height="180px">' +
      "</div><div id=" +
      q2 +
      ' class="options"><img src="img/' +
      q2 +
      ".jpg" +
      '"width="180px" height="180px">' +
      "</div><div id=" +
      q3 +
      ' class="options" ><img src="img/' +
      q3 +
      ".jpg" +
      '"width="180px" height="180px"></div>'
  );

  $("#myButton").click(function () {
    var test = $("<button>Test</button>").click(function () {
      alert("hi");
    });
  });

  $(".options").click(function () {
    if (questionLock == false && firstClick) {
      firstClick = false;
      questionLock = true;

      $("#" + this.id + ".options").addClass("highlight");

      //correct answer
      if (this.id == questionBank[questionNumber].answer) {
        $(stage).append('<div class="feedback1">CORRECT</div>');
        score++;
      }
      //wrong answer
      if (this.id != questionBank[questionNumber].answer) {
        $(stage).append('<div class="feedback2">WRONG</div>');
      }

      console.log(questionBank[questionNumber].answer);
      $(stage).append(
        '<button type="button" id="next">Next Question >></button>'
      );
      $("#next").on("click", function () {
        changeQuestion(noOfQuestions, questionBank);
      });
    } else {
      alert(
        "You can't alter your answer now !!! Please proceed to the next question when you are ready."
      );
    }
  });
}

function changeQuestion(noOfQuestions, questionBank) {
  questionNumber++;

  if (stage == "#currQuestion") {
    stage2 = "#currQuestion";
    stage = "#nextQuestion";
  } else {
    stage2 = "#nextQuestion";
    stage = "#currQuestion";
  }

  if (questionNumber < noOfQuestions) {
    displayQuestion(questionBank);
  } else {
    quizEnd(noOfQuestions);
  }

  $(stage2).animate({ right: "+=800px" }, "slow", function () {
    $(stage2).css("right", "-800px");
    $(stage2).empty();
  });
  $(stage).animate({ right: "+=800px" }, "slow", function () {
    questionLock = false;
  });
} //change question

function quizEnd(noOfQuestions) {
  $(stage).append(
    '<div class="Quiz end" id ="questionText">You have reached the end of the quiz !!!!!<br><br>Questions encountered: ' +
      noOfQuestions +
      "<br>You got <b>" +
      score +
      "</b> correct.</div>"
  );
} //display final slide

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

$(document).ready(function () {
  let quizQuestions = [];

  //async call => load json data
  $.getJSON("quizContent.json")
    .then((jsonData) => {
      quizQuestions = jsonData;

      for (let question in quizQuestions) {
        console.log(quizQuestions[question]);
      }
    })
    .then(() => {
      console.log("json data has been loaded .....");
      console.log("Shuffle the quiz questions....");
      shuffleArray(quizQuestions);
      for (let question in quizQuestions) {
        console.log(quizQuestions[question]);
      }

      console.log("The quiz will start now....");
      displayQuestion(quizQuestions);
    });
});

// fillDB();
