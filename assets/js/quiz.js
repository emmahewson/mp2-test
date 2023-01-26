// declaring consts for DOM elements
const startGameBtn = document.getElementById("start-game");
const nextQuestionBtn = document.getElementById("next-question-btn");
const gameDiv = document.getElementById("game-div");
const questionText = document.getElementById("question-text");
const choices = Array.from(document.getElementsByClassName("choice"));
const resultsDiv = document.getElementById("results-div");
const resultsCountry = document.getElementById("results-country");
const resultsImage = document.getElementById("results-image");
const resultsText = document.getElementById("results-text");

// declaring points
let userTotal = [0, 0, 0, 0, 0, 0];

let wildlifePoints = [0, 1, 0, 0, 3, 2];
let thrillPoints = [3, 0, 1, 0, 2, 0];
let culturePoints = [0, 0, 3, 2, 0, 1];
let foodPoints = [2, 3, 0, 1, 0, 0];
let peoplePoints = [1, 2, 0, 3, 0, 0];
let remotePoints = [0, 0, 2, 0, 1, 3];


// Start quiz functionality
startGameBtn.addEventListener('click', function startGame() {
    gameDiv.classList.toggle("hidden");
    startGameBtn.classList.toggle("hidden");
    addQuestionContent(0);
    nextQuestionBtn.disabled = true;
    handleAnswer();
});

// Populate the questions and answers
function addQuestionContent(index) {
    questionText.innerText = questions[0].questionText;
    populateAnswers(index)
    choices
};

// Populate the answers
function populateAnswers(index) {
    let answers = questions[index].answers;
    for (let i = 0; i < answers.length; i++) {
        choices[i].innerText = answers[i].answerText;
    }
};

/** Button toggle and select/deselect taken from:
 * https://www.sitepoint.com/community/t/select-one-button-deselect-other-buttons/348053*/

// function to handle user selecting answer
function handleAnswer() {
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            setClasses(choice);
        });
    });

    // adds a 'selected' class to selected answer & removes from others
    // enables next question button
    function setClasses(target) {
        choices.forEach(choice => {
            if (choice == target) {
                choice.classList.add("selected");
                nextQuestionBtn.disabled = false;
            } else {
                choice.classList.remove("selected");
            };
        });
    };
}

// Trigger nextQuestionButton using Enter - BUG!!!! Doesn't deselect
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nextQuestionBtn.click();
    };
});


// Next question button
nextQuestionBtn.addEventListener('click', function nextQuestion() {

    // tests if each button has class of selected 
    choices.forEach(choice => {
        if (choice.classList.contains("selected")) {

            // iterates through question array
            questions[0].answers.forEach(answer => {

                // matches the selected answer to the same answer in the array
                // updates the user totals based on the answer category/type by iterating through each answers array
                if (choice.innerText === answer.answerText) {
                    switch (answer.answerType) {
                        case "wildlife":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += wildlifePoints[i];
                            }
                            break;
                        case "thrill":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += thrillPoints[i];
                            }
                            break;
                        case "culture":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += culturePoints[i];
                            }
                            break;
                        case "food":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += foodPoints[i];
                            }
                            break;
                        case "people":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += peoplePoints[i];
                            }
                            break;
                        case "remote":
                            for (let i = 0; i < userTotal.length; i++) {
                                userTotal[i] += remotePoints[i];
                            }
                            break;
                    };
                };
            });
        };
    });

    // temp - adds scores to test site
    let scoreText = document.getElementsByClassName("score-text");
    for (let i = 0; i < scoreText.length; i++) {
        scoreText[i].innerText = userTotal[i];
    };


    // removes 'selected' class from buttons
    choices.forEach(choice => {
        choice.classList.remove("selected");
    });

    // remove current question from array and replace with next question or show results
    if (questions.length <= 1) {
        showResults();
    } else {
        if (questions.length == 2) {
            nextQuestionBtn.innerText = "See Results";
        }
        questions.splice(0, 1);
        addQuestionContent(0);
    }

    nextQuestionBtn.disabled = true;
});



function showResults() {
    // hides the question / answers
    gameDiv.classList.toggle("hidden");

    //calculates the index of the highest score (Matches index of country in countries array)
    let highestIndex = userTotal.indexOf(Math.max(...userTotal));

    // populates the results-div
    resultsCountry.innerText = countries[highestIndex].name;
    resultsImage.src = `assets/images/${countries[highestIndex].image}`;
    resultsText.innerText = countries[highestIndex].text;
    resultsDiv.classList.toggle("hidden");
}