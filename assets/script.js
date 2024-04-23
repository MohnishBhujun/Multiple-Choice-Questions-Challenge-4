//Creating variables
var userScore = 0;
var currentQuestionIndex = -1;
var timeRemaining = 0;
var quizTimer;

//Quiz Questions Array with title, choices, and answers
var quizQuestions = [{
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
},
{
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    correctAnswer: "<a>"
},
{
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
},
{
    question: "Which property is used to change the background color of an element in CSS?",
    options: ["color", "background-color", "bgcolor", "background"],
    correctAnswer: "background-color"
},
{
    question: "What is the purpose of JavaScript in web development?",
    options: ["Styling web pages", "Enhancing user interfaces", "Managing server databases", "Creating server-side applications"],
    correctAnswer: "Enhancing user interfaces"
},
{
    question: "What is the result of 2 + 2 in JavaScript?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
},
{
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "/* */", "**"],
    correctAnswer: "//"
},
{
    question: "What does 'CSS' refer to in web development?",
    options: ["Cascading Style Sheets", "Computer Software System", "Coding Style Standards", "Central Style Selection"],
    correctAnswer: "Cascading Style Sheets"
},
{
    question: "What is the purpose of the <head> tag in HTML?",
    options: ["To define the main content of the webpage", "To provide metadata about the document", "To display a heading at the top of the page", "To create a hyperlink to another webpage"],
    correctAnswer: "To provide metadata about the document"
}
]

//Starting the quiz
function startQuiz() {
    timeRemaining = 75;
    document.getElementById("timeLeft").innerHTML = timeRemaining;

    quizTimer = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeLeft").innerHTML = timeRemaining;
       
        //when the timer reaches 0, the Quiz is over
        if (timeRemaining <= 0) {
            clearInterval(quizTimer);
            endQuiz(); 
        }
    }, 1000);

    displayNextQuestion();
}

//Ending the quiz
function endQuiz() {
    clearInterval(quizTimer);

    var quizContent = `
    <h2>Quiz Completed</h2>
    <h3>Your final score: ` + userScore +  ` /100</h3>
    <h3>That means you got: ` + userScore / 10 +  ` questions correct</h3>
    <input type="text" id="username" placeholder="Enter your name"> 
    <button onclick="saveScore()">Submit</button>`;

    document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

//Saving user's score in local storage
function saveScore() {
    localStorage.setItem("highscore", userScore);
    localStorage.setItem("highscoreName",  document.getElementById('username').value);
    displayScores();
}

//Displaying high scores from local storage
function displayScores() {
    var highScoreContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s Highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScores()">Clear score</button><button onclick="resetQuiz()">Go Back</button>`;

    document.getElementById("main_quiz_screen").innerHTML = highScoreContent;
}

//Clearing high scores from local storage
function clearScores() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    resetQuiz();
}

//Resetting the quiz
function resetQuiz() {
    clearInterval(quizTimer);
    userScore = 0;
    currentQuestionIndex = -1;
    timeRemaining = 0;
    quizTimer = null;

    document.getElementById("timeLeft").innerHTML = timeRemaining;

    var quizContent = `
    <h1> Web Development Quiz </h1>
    <button onclick="startQuiz()">Start</button>`;

    document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

//Moving to the next question
function displayNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex > quizQuestions.length - 1) {
        endQuiz();
        return;
    }

    var quizContent = "<h2>" + quizQuestions[currentQuestionIndex].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < quizQuestions[currentQuestionIndex].options.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"checkAnswer(this)\">" + quizQuestions[currentQuestionIndex].options[buttonLoop] + "</button>"; 
        quizContent += buttonCode;
    }

    document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

//Checking the selected answer
function checkAnswer(selectedOption) {
    var userChoice = selectedOption.textContent;

    if (userChoice === quizQuestions[currentQuestionIndex].correctAnswer) {
        userScore += 15;
    } else {
        timeRemaining -= 10;
    }

    displayNextQuestion();
}

//Starting the quiz when the page loads
document.addEventListener("DOMContentLoaded", function() {
    resetQuiz();
});