const playButton = document.getElementById("toPlay");
const highScoresButton = document.getElementById("toHighScores");
const settingsButton = document.getElementById("toSettings");

window.onload = initialize;

/**
 * Initializes the main page
 */
function initialize()
{
    playButton.onclick = mainToPlay;
    highScoresButton.onclick = mainToScores;
    settingsButton.onclick = mainToSettings;
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

/**
 * Navigates to settings page
 */
function mainToSettings()
{
    window.location.href = "settings.html";
}
