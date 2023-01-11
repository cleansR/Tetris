const storage = localStorage;
const highScoreAccessKey = "High Scores";
const maxScoreLength = 100;

var highScores = retrieveHighScores();

class Score{
    constructor(startLevel, endLevel, score, linesCleared)
    {
        this.startLevel = startLevel;
        this.endLevel = endLevel;
        this.score = score;
        this.date = (new Date()).toString();
        this.linesCleared = linesCleared;
    }
    getScore(){ return this.score; }
}

function retrieveHighScores()
{
    let highScoreString = localStorage.getItem(highScoreAccessKey);
    if(highScoreString == null){
        return [];
    }
    else{
        let highScoresArray = JSON.parse(highScoreString);
        return highScoresArray;
    }
}

/**
 * Updates the highest scores list with the current score
 */
function updateTopScores(startLevel, endLevel, newScore, linesCleared)
{
    let swapScore = new Score(startLevel, endLevel, newScore, linesCleared);
    let swapScoreValue = newScore;

    for(let i = 0; i < highScores.length; i++){
        if(swapScoreValue > highScores[i].score){
            let newSwapScore = highScores[i];
            highScores[i] = swapScore;

            swapScore = newSwapScore;
            swapScoreValue = highScores[i].score;
        }
    }
    if(highScores.length < maxScoreLength){
        highScores.push(swapScore);
    }

    let highScoreString = JSON.stringify(highScores);

    storage.setItem(highScoreAccessKey, highScoreString);  
}