const storage = localStorage;
const highScoreAccessKey = "High Scores";
const controlsAccessKey = "Controls";
const maxScoreLength = 100;

var highScores = retrieveHighScores();



/**
 * Class to store score information
 */
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

/**
 * Class to store controls information
 */
class Controls
{
    constructor(left, right, down, instantDrop, rotateLeft, rotateRight, hold, volume)
    {
        this.left = left;
        this.right = right;
        this.down = down;
        this.instantDrop = instantDrop;
        this.rotateLeft = rotateLeft;
        this.rotateRight = rotateRight;
        this.hold = hold;
        this.volume = volume;
    }
}

/**
 * Returns the array of score objects representing the user's high scores
 * @returns {Array<Score>}
 */
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

/**
 * Returns the saved Controls object
 * @returns {Controls} the saved Controls object
 */
function retrieveControls()
{   
    //localStorage.removeItem(controlsAccessKey);
    let controlString = localStorage.getItem(controlsAccessKey);
    if(controlString == null){
        let controls =  new Controls("ArrowLeft", "ArrowRight", "ArrowDown", "Space", "KeyA", "ArrowUp", "KeyC", 50);
        return controls;
    }
    else{
        let controlsObj = JSON.parse(controlString);
        return controlsObj;
    }
}

/**
 * Stores the new Controls object into localStorage
 * @param {Controls} controls the new Controls object
 */
function updateControls(controls)
{
    let controlsString = JSON.stringify(controls);
    storage.setItem(controlsAccessKey, controlsString);
}
