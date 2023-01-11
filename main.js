const playButton = document.getElementById("toPlay");
const highScoresButton = document.getElementById("toHighScores");

window.onload = initialize;

/**
 * Initializes the main page
 */
function initialize()
{
    playButton.onclick = mainToPlay;
    highScoresButton.onclick = mainToScores;
}

/**
 * Navigates to the game page
 */
function mainToPlay()
{
    window.location.href = "tetris.html";
}

/**
 * Navigates to the high-scores page
 */
function mainToScores()
{
    window.location.href = "scores.html";
}
