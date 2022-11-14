
var questionContainer = document.querySelector('.question-container')

var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");

var timeEl = document.querySelector("#timer");
var gameOverModal = document.getElementById("time-modal")

var startBtnEl = document.querySelector("#start-btn");
var scoresCount = document.querySelector("#scores-count")
var highScoreDisplay = document.querySelector('#high-scores-count');

var playAgainBtnEl = document.querySelector("#play-again-btn")
var winPlayAgainBtn = document.querySelector("#win-play-again")
var winModalEl = document.querySelector("#win-modal")

var timer;
var secondsLeft;

// let shuffledQuestions, currentQuestionIndex;
var questionEl = document.querySelector("#question-display");
var answersEl = document.querySelector("answers-display");
var answerButtons = document.getElementsByClassName("answer-btn")
var questionDisplayEl = document.querySelector("#question-display");
var answerBoxEl = document.querySelector("#answer-box");

var questionList = [
    {
        question: 'Commonly used data types do NOT include:',
        answers: [
            {text: 'Strings', correct: false},
            {text: 'Booleans', correct: false},
            {text: 'Alerts', correct: true},
            {text: 'Numbers', correct: false}
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers: [
            {text: '" "', correct: false},
            {text: '{ }', correct: false},
            {text: '( )', correct: true},
            {text: '[ ]', correct: false}
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store:',
        answers: [
            {text: 'Numbers and strings', correct: false},
            {text: 'Other arrays', correct: false},
            {text: 'Booleans', correct: false},
            {text: 'All of the above', correct: true}
        ]
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: [
            {text: ', ,', correct: false},
            {text: '{ }', correct: false},
            {text: '" "', correct: true},
            {text: '( )', correct: false}
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            {text: 'Javascript', correct: false},
            {text: 'Terminal/bash', correct: false},
            {text: 'For loops', correct: false},
            {text: 'Console log', correct: true}
        ]
    }
]

// function selectQuestion() {
//     resetButtons();
//     displayQuestion(shuffledQuestions[currentQuestionIndex]);
// }

function displayQuestion(i) {
    console.log(i);
    if (i >= 5) {
        gameOver();
        return;
    }
    questionEl.innerText = questionList[i].question;
    let j=0;
    questionList[i].answers.forEach(answer => {
        let button = answerButtons[j];
        button.style.color = "rgb(99, 99, 239)";
        button.innerText = answer.text;
        j += 1;
        // if (answer.correct) {
        //     button.dataset.correct = answer.correct;
        // }
        button.addEventListener('click', () => {
            if (answer.correct) {
                button.style.color = "green";
                displayQuestion(i+1);
            } else {
                button.style.color = "red";
                secondsLeft -= 10;
            }
        }, {once:true});
    })
}

// function gameOverModal() {

// }

function gameOver() {
    clearInterval(timer);
    questionEl.innerText = "GAME OVER";
    answerBoxEl.style.display="none";
    // gameOverModal();
    // storeScores();
}

//initializes all start game functions
function startGame() {
    console.log("Game started!");
    isGameOver = false; 
    secondsLeft = 120;
    startTimer();
    startBtnEl.disabled = true;
    startBtnEl.style.display="none";
    // shuffledQuestions = questionList.sort(() => Math.random() - .5);
    // currentQuestionIndex = 0;
    displayQuestion(0);
}

//sets timer
function startTimer() {
    timer = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time left: " + secondsLeft + " s";

        if(secondsLeft === 0) {
            gameOver();
        };
    }, 1000);
}

//starts game
startBtnEl.addEventListener('click', startGame)
