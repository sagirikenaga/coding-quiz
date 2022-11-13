
var questionContainer = document.querySelector('.question-container')

var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");

var timeEl = document.querySelector("#timer");
var timeModalEl = document.getElementById("time-modal")

var startBtnEl = document.querySelector("#start-btn");
var scoresCount = document.querySelector("#scores-count")
var highScoreDisplay = document.querySelector('#high-scores-count');

var playAgainBtnEl = document.querySelector("#play-again-btn")
var winPlayAgainBtn = document.querySelector("#win-play-again")
var winModalEl = document.querySelector("#win-modal")

var timer;
var secondsLeft;
