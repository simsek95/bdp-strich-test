let rightAnswerCount = 0;
let wrongAnswerCount = 0;

let allLines = [
    document.getElementById("line_tl"),
    document.getElementById("line_tm"),
    document.getElementById("line_tr"),
    document.getElementById("line_bl"),
    document.getElementById("line_bm"),
    document.getElementById("line_br"),
]

let possibleWantedCombinations = [
    new combination("b", 0),
    new combination("b", 1),
    new combination("b", 2),

    new combination("d", 0),
    new combination("d", 1),
    new combination("d", 2),

    new combination("p", 0),
    new combination("p", 1),
    new combination("p", 2),
]

let currentWantedCombination;
let currentShownCombination;

let secondsRemaining;
let timeToPlayWhenStart = 300;

function initializeTest() {
    changeCombination();
    currentWantedCombination = getRandomCombination();
    showWantedCombination();
    currentShownCombination = getRandomCombination();
}

function goToIntroduction(timeToSet) {
    toggleMenu(false);
    toggleIntroduction(true);
    timeToPlayWhenStart = timeToSet;
}

function startGame() {
    toggleIntroduction(false);
    startTimer(timeToPlayWhenStart);
}

function endGame() {
    document.getElementById("Results").classList.remove("hidden");
    showResults();
}

function showResults() {
    const totalCount = (rightAnswerCount + wrongAnswerCount);
    document.getElementById("TotalCount").innerHTML = totalCount.toString();
    document.getElementById("CorrectCount").innerHTML = (rightAnswerCount).toString();
    document.getElementById("Rate").innerHTML = `${(rightAnswerCount / Math.max(1, totalCount) * 100).toFixed(2)}% `;
    document.getElementById("CountMinute").innerHTML = `${(totalCount / (timeToPlayWhenStart / 60)).toFixed(2)}`;
}


function toggleMenu(showMenuBoolean) {
    if (showMenuBoolean) {
        document.getElementById("MenuOverlay").classList.remove("hidden");
    }
    else {
        document.getElementById("MenuOverlay").classList.add("hidden");
    }
}

function toggleIntroduction(showIntroBoolean) {
    if (showIntroBoolean) {
        document.getElementById("Introduction").classList.remove("hidden");
    }
    else {
        document.getElementById("Introduction").classList.add("hidden");
    }
}

function randomNumber(maxExcl) {
    return Math.floor(Math.random() * maxExcl);
}

function changeCombination() {
    currentShownCombination = getRandomCombination();
    changeLetter(currentShownCombination.letter);
    showLines();
}

function showWantedCombination() {
    document.getElementById("wantedCombinationDisplay").innerHTML = `${currentWantedCombination.letter} ${currentWantedCombination.lineCount} xI`;
    document.getElementById("introLetterDisplay").innerHTML = `${currentWantedCombination.letter} `;
    document.getElementById("introLineDisplay").innerHTML = `${currentWantedCombination.lineCount} x I`;
}

function changeLetter(newLetter) {
    document.getElementById("letter").innerHTML = newLetter;
}

function getRandomCombination() {
    let index = randomNumber(possibleWantedCombinations.length);
    return possibleWantedCombinations[index];
}

function logAnswer(isRightLetter) {
    if (isRightAnswer(isRightLetter)) logRightAnswer();
    else logWrongAnswer();

    changeCombination();
}

function isRightAnswer(myAnswerBoolean) {
    return (myAnswerBoolean === (currentWantedCombination == currentShownCombination))
}

function logRightAnswer() {
    rightAnswerCount++;
    document.getElementById("answerCount_Right").innerHTML = `Right: ${rightAnswerCount} `;

}

function logWrongAnswer() {
    wrongAnswerCount++;
    document.getElementById("answerCount_Wrong").innerHTML = `Wrong: ${wrongAnswerCount} `;
}

function hideAllLines() {
    for (let i = 0; i < allLines.length; i++) {
        allLines[i].classList.add("hidden");
    }
}

function showLines() {
    hideAllLines();
    for (let i = 0; i < currentShownCombination.lineCount; i++) {
        allLines[randomNumber(allLines.length)].classList.remove("hidden");

    }
}


// Funktion, um die Zeit im Format mm:ss anzuzeigen
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds} `;
}

// Funktion zum Starten des Timers
function startTimer(duration) {
    let timerDisplay = document.getElementById('timer');
    secondsRemaining = duration;
    timerDisplay.textContent = formatTime(secondsRemaining);

    // Update-Anzeige alle 1 Sekunde
    const interval = setInterval(() => {
        secondsRemaining--;

        // Anzeige aktualisieren
        timerDisplay.textContent = formatTime(secondsRemaining);

        if (secondsRemaining <= 0) {
            // Timer abgelaufen, Aktionen durchführen
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// // Timer starten, 5 Minuten = 5 * 60 Sekunden
// startTimer(5 * 60);


function reloadPage() {
    location.reload();
}