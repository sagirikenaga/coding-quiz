//global variables
var questionContainer = document.querySelector('.question-container')
var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");
var highscoresListEl = document.querySelector("#high-scores-list");
var timeEl = document.querySelector("#timer");
var gameOverModal = document.getElementById("time-modal")
var startBtnEl = document.querySelector("#start-btn");
var playAgainBtnEl = document.querySelector("#play-again-btn")
var winPlayAgainBtn = document.querySelector("#win-play-again")
var questionEl = document.querySelector("#question-display");
var answersEl = document.querySelector("answers-display");
var answerButtons = document.getElementsByClassName("answer-btn")
var questionDisplayEl = document.querySelector("#question-display");
var answerBoxEl = document.querySelector("#answer-box");
let submitScore = document.querySelector("#submit-btn");
let initialsEl = document.querySelector("#initials");
let formEl = document.querySelector("#form")
let storedList = JSON.parse(localStorage.getItem("highscores")) || [];

let gameIndex = 0;
var timer;
var secondsLeft = 120;

//list of questions and answers
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

//function to loop through questionList array and display the question and corresponding answers to each button
// assigns onclick to buttons 
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

//function that checks if clicked answer button is correct; red if wrong and deducts 10 seconds from timer, green if true and runs next question
function checkAnswer(event) {
        if (this.value === 'true') {
            this.style.color = "green";
            displayQuestion(gameIndex+=1);
        } else {
            this.style.color = "red";
            secondsLeft -= 10;
        }
}

//function that runs when timer is up -> clears interval, displays game over and displays modal to enter initials and play again
function gameOver() {
    clearInterval(timer);
    questionEl.innerText = "GAME OVER";
    answerBoxEl.style.display="none";
    gameOverModal.style.display="block";
}

// adds event listener to submit button when initials are submitted -> sets into local storage
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

// displays the scores from local storage onto high score modal
function renderScores() {
    for (var i=0; i < 5; i++) {
        var li = document.createElement("li");
        var reverse = storedList.reverse();
        li.textContent = reverse[i].initials + ": " + reverse[i].time;
        highscoresListEl.appendChild(li);
    }
}

// function to start the game 
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

// event listener to run function display module when highscore button is clicked 
scoreButtonEl.addEventListener ('click', showScoreModal);

//displays the highscore modal
function showScoreModal() {
    scoreModalEl.style.display="block";
}

// Closes modal when the "x" button is clicked 
scoreCloseEl.addEventListener('click',function() {
    scoreModalEl.style.display="none";
});

// reloads the page when user wants to play again
playAgainBtnEl.addEventListener('click', function() {
    window.location.reload();
})

//starts game when button is clicked
startBtnEl.addEventListener('click', startGame)
renderScores();