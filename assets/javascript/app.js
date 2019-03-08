// VARIABLES
quizMaterial = [
    {   question: "What was the first TV show to win the Hugo Award for Best Dramatic Presentation?",
        choices: ["The Twilight Zone", "Lost in Space", "The Alfred Hitchcock Hour", "Star Trek"],
        answer: 0
    },
    {   question: "The theme song of which classic TV show ends with the line, “You’re gonna make it after all”?",
        choices: ["The Dick Van Dyke Show", "The Odd Couple", "The Mary Tyler Moore Show", "Taxi"],
        answer: 2
    },
    {   question: "Which of these series is not an American adaptation of a Spanish-language telenovela?",
        choices: ["One Day at a Time", "Ugly Betty", "Queen of the South", "Jane the Virgin", "Devious Maids"],
        answer: 0
    },
    {   question: "What is the longest running sitcom of all time?",
        choices: ["The Big Bang Theory", "The Simpsons", "Cheers", "Family Guy"],
        answer: 1
    },
    {   question: "Who is the only Sesame Street character with five fingers instead of four?",
        choices: ["The Count", "Grover", "Cookie Monster", "Big Bird"],
        answer: 2
    },
    {   question: "What is the phrase on the iconic UFO poster in Agent Mulder's office in The X-Files?",
        choices: ["We Are Not Alone", "The Truth is Out There", "Trust No One", "I Want to Believe"],
        answer: 3
    },
    {   question: "Name the child star of an iconic 60s sitcom later became an accomplished Hollywood director.",
        choices: ["Judy Garland", "Leonardo DiCaprio", "Jodie Foster", "Ron Howard"],
        answer: 3
    },
    {   question: "Which show is notable for having killed off one of its main characters over 120 times?",
        choices: ["Supernatural", "South Park", "Stargate SG-1", "The Simpsons"],
        answer: 1
    },
    {   question: "Which TV show holds the record for most expensive sitcom season ever?",
        choices: ["Frasier", "The Office", "Friends", "Two and a Half Men"],
        answer: 2
    },
    {   question: "Only three programs have ever had their final seasons be the number one ranked show on TV. Which of these is NOT one of them?",
        choices: ["Cheers", "Seinfeld", "I Love Lucy", "The Andy Griffith Show"],
        answer: 0
    },
    {   question: "Who is the youngest person ever to host Saturday Night Live?",
        choices: ["Drew Barrymore", "Miley Cyrus", "Macaulay Culkin", "Justin Bieber"],
        answer: 0
    },
    {   question: "Which of these is NOT a TV show fictionalizing a REAL musical group?",
        choices: ["The Beatles", "Flight of the Conchords", "The Monkees", "Garfunkel and Oats", "The Jonas Brothers"],
        answer: 4
    }
]

var qIndex = -1;
var correct = 0;
var timer = 25;
var timeInt;

// FUNCTIONS
function nextQuestion() {
    qIndex++;

    if (qIndex == 0) {
        $("#q-title").html("QUESTION #");
        $("#time-title").html("TIME LEFT");
        $("#correct-title").html("CORRECT: ");
        $("#correct-panel").html("0");
        $("#button-panel").empty();
    }

    if (qIndex < quizMaterial.length) {
        $("#answer").empty();
        $("#choices").empty();
        $("#q-num").html(qIndex+1);
        $("#question").html(quizMaterial[qIndex].question);
        $("#time-panel").html("<span class='side-text' id='time-remaining'>" + timer + "</span> sec");

        quizMaterial[qIndex].choices.forEach(function(value, i) {
            var newButton = $("<button type='button'>");
            newButton.text(value);
            newButton.addClass("btn btn-secondary btn-lg btn-block choiceButton");
            newButton.data("value", i);
            $("#choices").append(newButton);
        });

        startTimer();

    } else {
        finishQuiz();
    }
}

function startTimer() {
    timer = 25;
    timeInt = setInterval (decrement, 1000);
}

function decrement () {
    timer--;
    $("#time-remaining").html(timer);

    if (timer === 0) {
        clearInterval(timeInt);
        $("#time-panel").html("&nbsp;");
        $("#choices").html("<p class='giant'>Time's Up! The answer:</p><br>");
        $("#answer").html("<p class='giant' style='font-weight: bold'>" + quizMaterial[qIndex].choices[quizMaterial[qIndex].answer] + "</p>");
        setTimeout(nextQuestion, 1000 * 6);
    }
}

function finishQuiz() {
    $("#q-num").empty();
    $("#question").empty();
    $("#answer").html("<p>You got " + correct + " out of " + quizMaterial.length + ".</p><br><p class='giant'>" + (correct / quizMaterial.length * 100).toFixed() + "% correct!</p>");
    $("#button-panel").html("<button type='button' class='btn btn-warning btn-lg btn-block start-quiz'>Try Again</button>")
    qIndex = -1;
    correct = 0;
}

// MAIN APP
$(document).on("click", ".start-quiz", nextQuestion);

$(document).on("click", ".choiceButton", function () {
    clearInterval(timeInt);

    var aChoice = $(this).data("value");
    var correctChoice = quizMaterial[qIndex].answer;

    $("#choices").empty();
    $("#time-panel").html("&nbsp;");

    if (aChoice == correctChoice) {
        correct++;
        $("#answer").html("<p class='giant'>Correct!</p>");
        $("#correct-panel").html(correct);
    } else {
        $("#choices").html("<p class='giant'>Sorry, the answer is...</p><br>");
        $("#answer").html("<p class='giant' style='font-weight: bold'>" + quizMaterial[qIndex].choices[correctChoice] + "</p>");
    }

    setTimeout(nextQuestion, 1000 * 4);
})