const showScoreScreen = document.getElementById("topLeftScreen");
const highScoreList = document.getElementById("topRightScreen");
const enterButton = document.getElementById("enter");
const lengthSelect = document.getElementById("numberItems");
const backButton = document.getElementById("back");


var highScoreArray = null;
var scoreListLength = 5;

window.onload = initialize;

/**
 * Initializes the high-scores page
 */
function initialize()
{
    highScoreArray = retrieveHighScores();
    drawHighScores();

    enterButton.onclick = enter;
    backButton.onclick = back;


    let lengths = [5, 10, 25, 50, 75, 100];
    for(let i = 0; i < lengths.length; i++){
        let op = document.createElement("option");
        op.innerText = lengths[i];
        lengthSelect.appendChild(op);
    }
}

/**
 * Updates the shown list of high-scores with varying length
 */
function enter()
{
    scoreListLength = lengthSelect.options[lengthSelect.selectedIndex].text;
    drawHighScores();
}

/**
 * Returns to the home page
 */
function back()
{
    window.location.href = "index.html";
}

/**
 * Draws the list of high scores on the screen
 */
function drawHighScores()
{
    while(highScoreList.hasChildNodes()){
        highScoreList.removeChild(highScoreList.firstChild);
    }

    showScoreScreen.innerText = "";

    for(let i = 0; i < Math.min(highScoreArray.length, scoreListLength); i++){
        let newDiv = document.createElement("div");
        let rank = parseInt(i)+1;
        let thisScore = highScoreArray[i].score;
        let text = `${rank}. ${thisScore}`;
        newDiv.innerText = text;
        newDiv.id = i;
        newDiv.classList.add("scoreDiv");
        newDiv.addEventListener("click", showPressedScore);
        highScoreList.appendChild(newDiv);
    }
}

/**
 * Shows information about the selected high-score
 */
function showPressedScore()
{
    let source = this.id;
    let score = highScoreArray[source].score;
    let startLevel = highScoreArray[source].startLevel;
    let endLevel = highScoreArray[source].endLevel;
    let date = highScoreArray[source].date;
    let linesCleared = highScoreArray[source].linesCleared;
    showScoreScreen.innerText = `
        Score: ${score}\n\n 
        Lines Cleared: ${linesCleared}\n\n
        Start Level: ${startLevel}\n\n
        End Level: ${endLevel}\n\n
        Date: ${date}
    `;
}
