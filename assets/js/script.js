
var questionContainer = document.querySelector('.question-container')

var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");
var highscoresListEl = document.querySelector("#high-scores-list");

var timeEl = document.querySelector("#timer");
var gameOverModal = document.getElementById("time-modal")

var startBtnEl = document.querySelector("#start-btn");
var scoresCount = document.querySelector("#scores-count")
var highScoreDisplay = document.querySelector('#high-scores-count');

var playAgainBtnEl = document.querySelector("#play-again-btn")
var winPlayAgainBtn = document.querySelector("#win-play-again")
var winModalEl = document.querySelector("#win-modal")

var timer;
var secondsLeft = 120;

var questionEl = document.querySelector("#question-display");
var answersEl = document.querySelector("answers-display");
var answerButtons = document.getElementsByClassName("answer-btn")
var questionDisplayEl = document.querySelector("#question-display");
var answerBoxEl = document.querySelector("#answer-box");
let submitScore = document.querySelector("#submit-btn");

let initialsEl = document.querySelector("#initials");
let storedList = JSON.parse(localStorage.getItem("highscores")) || [];
let gameIndex = 0;
let formEl = document.querySelector("#form")

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
        button.style.color = "white";
        button.innerText = answer.text;
        button.value = answer.correct;
        button.onclick = checkAnswer;
        j += 1;
    })
}

function checkAnswer(event) {
    console.log(this);
    console.log(event.target)
    // button.addEventListener('click', () => {
        if (this.value === 'true') {
            this.style.color = "green";
            displayQuestion(gameIndex+=1);
        } else {
            this.style.color = "red";
            secondsLeft -= 10;
        }
    // }, {once:true});
}

function gameOver() {
    clearInterval(timer);
    questionEl.innerText = "GAME OVER";
    answerBoxEl.style.display="none";
    gameOverModal.style.display="block";
    // storeScores();
}

submitScore.addEventListener('click', function (event) {
    event.preventDefault();
    var newScore = {
        initials: initialsEl.value.trim(),
        time: secondsLeft,
    }
    storedList.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(storedList));
    formEl.style.display="none"
    renderScores();
})

function renderScores() {
    for (var i=0; i < 5; i++) {
        var li = document.createElement("li");
        var reverse = storedList.reverse();
        console.log(reverse)
        li.textContent = reverse[i].initials + ": " + reverse[i].time;
        highscoresListEl.appendChild(li);
    }
}

//initializes all start game functions
function startGame() {
    console.log("Game started!");
    isGameOver = false; 
    startTimer();
    startBtnEl.disabled = true;
    startBtnEl.style.display="none";
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

scoreButtonEl.addEventListener ('click', showScoreModal);

function showScoreModal() {
    scoreModalEl.style.display="block";
}

// Closes modal when the "x" button is clicked 
scoreCloseEl.addEventListener('click',function() {
    scoreModalEl.style.display="none";
});

playAgainBtnEl.addEventListener('click', function() {
    window.location.reload();
})


//starts game
startBtnEl.addEventListener('click', startGame)
renderScores();