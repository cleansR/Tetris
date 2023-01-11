const playButton = document.getElementById("toPlay");
const highScoresButton = document.getElementById("toHighScores");

window.onload = initialize;

function initialize()
{
    playButton.onclick = mainToPlay;
    highScoresButton.onclick = mainToScores;
}

function mainToPlay()
{
    window.location.href = "tetris.html";
}

function mainToScores()
{
    window.location.href = "scores.html";
}
