let questionNumber = 0;
var stage = "#currQuestion";
var stage2 = new Object();
var questionLock = false;
var score = 0;
let noOfQuestions;
let chances = 0;

/* Entry point of the js upon DOM loading */
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

//score card
function handleQuizStatus() {
  $(".currQuizStatus").html(
    `<p class="status"><span>Question: </span>${
      questionNumber + 1
    } out of ${noOfQuestions}<br><span>Score: </span>${score} out of ${noOfQuestions}</p>`
  );
}

//display the question
function displayQuestion(questionBank) {
  chances = 0;
  noOfQuestions = questionBank.length;
  handleQuizStatus();
  shuffleArray(questionBank[questionNumber]);

  q1 = questionBank[questionNumber].options[0];
  q2 = questionBank[questionNumber].options[1];
  q3 = questionBank[questionNumber].options[2];

  imgWidth = "170px";
  imgHeight = "170px";

  $(stage).append(
    '<div  class="question" id ="questionText">' +
      questionBank[questionNumber].question +
      '</div> <div  class="quizOptions"><div id=' +
      q1 +
      ' class="options" ><img src="img/' +
      q1 +
      ".jpg" +
      `"width=${imgWidth} height=${imgHeight}>` +
      "</div><div id=" +
      q2 +
      ' class="options"><img src="img/' +
      q2 +
      ".jpg" +
      `"width=${imgWidth} height=${imgHeight}>` +
      "</div><div id=" +
      q3 +
      ' class="options" ><img src="img/' +
      q3 +
      ".jpg" +
      `"width=${imgWidth} height=${imgHeight}></div></div>`
  );
  $(stage).append('<div id="feedback"></div>');
  $(stage).append('<div id="goToNextQuestion"></div>');

  $(".options").click(function () {
    console.log(chances);
    if (chances < 2) {
      chances++;

      console.log("you clicked: " + this.id);

      //correct answer
      if (this.id == questionBank[questionNumber].answer) {
        score++;
        handleQuizStatus();
        $("#" + this.id + ".options").addClass("right");
        $("#feedback").html('<div class="feedback1">CORRECT</div>');
        chances = 2;
      }

      //wrong answer
      if (this.id != questionBank[questionNumber].answer) {
        $("#" + this.id + ".options").addClass("wrong");
        $("#feedback").html(
          `<div class="feedback2">That was the ${this.id}.</div>`
        );
      }

      if (chances == 2) {
        addNextButton(noOfQuestions, questionBank);
      } else {
        $("#chancesModal .modal-body").append(
          "You have one more chance left !!"
        );
        $("#chancesModal").modal("show");
      }
    } else {
      addNextButton(noOfQuestions, questionBank);
      $("#chancesModal .modal-body").html(
        " You can't alter your answer now !!! <br> Please proceed to the next question when you are ready."
      );
      $("#chancesModal").modal("show");
    }
  });
}

/* adds the button moving to the next question */
function addNextButton(noOfQuestions, questionBank) {
  $("#goToNextQuestion").html(
    '<button type="button" id="next">Next Question >></button>'
  );
  $("#next").click(function () {
    changeQuestion(noOfQuestions, questionBank);
  });
}

/* In charge of transition to the next question */
function changeQuestion(noOfQuestions, questionBank) {
  handleQuizStatus();
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
    chances = 0;
  });
}

/* last page of the quiz */
function quizEnd(noOfQuestions) {
  $(".currQuizStatus").remove();
  $(stage).append(
    '<div class="Quiz end" id ="questionText">You have reached the end of the quiz !!!!!<br><br>Questions encountered: ' +
      noOfQuestions +
      "<br>You got <b>" +
      score +
      "</b> correct.</div>"
  );
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
