//Tetris 2-D array size
const boardHeight = 20;
const boardWidth = 10;

//GUI variables
const startButton = document.getElementById("startGame");

//Score multipliers for different line clears
const singleScore = 100;
const doubleScore = 300;
const tripleScore = 500;
const tetrisScore = 800;

// Max level in which speeds change
const highestEffectiveLevel = 29;

// Current speed-related variables
var currentTickSpeed = 800;
var currentLockSpeed = 400;

// Current game-state variables
var boardArray;
var currentGameTick = null;
var gameInProgress = false;
var canStart = true;

// Current input-related variables
var heldPiece = null;
var usedHold = false;
var nextPiece = null;
var currentPiece = null;

// Current score-related variables
var currentScore = 0;
var currentLevel = 0;
var linesCleared = 0;

// Other variables
var topScores = [0, 0, 0];
var music = null;

// How often (in ms) a piece moves down one row depending on current level
const dropSpeed = [
    800, 720, 630, 550, 470, 380, 300, 220, 140, 100, 
    84, 84, 84, 67, 67, 67, 50, 50, 50, 
    33, 33, 33, 33, 33, 33, 33, 33, 33, 33,
    15 
];


// --------------------------------------Functions------------------------------------------------



window.onload = setUp;


/**
 * Initialization for the game once the window loads
 */
function setUp()
{
    // Creates the game-board
    boardArray = new Array(20);
    for(let i = 0; i < 20; i++){
        boardArray[i] = new Array(10);
        for(let j = 0; j < 10; j++){
            boardArray[i][j] = 0;
        }
    }

    // Initializes all GUI/graphics
    initializeGraphics();

    // Sets event-listeners for various input methods
    window.onkeydown = function(event){
        parseInput(event);
    };

    startButton.onclick = startGame;
}







//Input-related methods

/**
 * Determines the action based off what key was pressed
 * @param {Event} event the key event that was fired
 */
function parseInput(event)
{
    let code = event.code;
    if(code == "ArrowDown" && gameInProgress){
        currentPiece.moveDown();
    }
    else if( (code == "ArrowUp" || code == "KeyD") && gameInProgress){
        currentPiece.rotateRight();
    }
    else if(code == "KeyA" && gameInProgress){
        currentPiece.rotateLeft();
    }
    else if(code == "ArrowLeft" && gameInProgress){
        currentPiece.moveLeft();
    }
    else if(code =="ArrowRight" && gameInProgress){
        currentPiece.moveRight();
    }
    else if(code == "KeyC" && gameInProgress){
        holdPiece();
    }
    else if(code == "Space" && gameInProgress){
        autoDrop();
    }
}

/**
 * Saves the current piece for later use and takes out the held piece if present
 */
function holdPiece()
{
    if(!usedHold && !currentPiece.isLocked()){
        if(heldPiece == null){
            
            // Removes the current piece from the game-board, resets it to default settings, and saves it
            eraseTetriminoInArray(currentPiece.getOrigin(), currentPiece.getPieces())
            currentPiece.setOrigin([0, 3]);
            currentPiece.resetRot();
            currentPiece.resetInterval();

            heldPiece = currentPiece;
            startNextPiece();
        }
        else{
            // Removes the current piece from the game-board, resets it to default settings, and swaps it with the currently held piece
            eraseTetriminoInArray(currentPiece.getOrigin(), currentPiece.getPieces())
            currentPiece.setOrigin([0, 3]);
            currentPiece.resetRot();
            currentPiece.resetInterval();

            let tempPiece = currentPiece;
            currentPiece = heldPiece;
            heldPiece = tempPiece;
        }
        updateGraphics();
        drawHoldPieceScreen();
        usedHold = true;
    }
}

/**
 * Automatically drops the current piece to the lowest point possible on the board (Instant Drop)
 */
function autoDrop()
{
    // Determines the lowest valid position for the piece, moves it to that location, and locks it
    let tempOrigin = [currentPiece.getOrigin()[0] , currentPiece.getOrigin()[1]];
    while(validMove(currentPiece.getOrigin(), tempOrigin, currentPiece.getPieces(), currentPiece.getPieces())){
        tempOrigin[0]++;
    }
    tempOrigin[0]--;
    currentPiece.move(currentPiece.getOrigin(), tempOrigin, currentPiece.getPieces(), currentPiece.getPieces());
    currentPiece.setOrigin(tempOrigin);
    currentPiece.lock();
}








//Game loop-related methods

/**
 * Returns a new randomly generated piece
 * @returns {Tetrimino} the created piece
 */
function createPiece()
{
    let randNum = Math.floor(Math.random() * pieces.length);
    return new Tetrimino(pieces[randNum], [0, 3], tetriminoNumber.get(pieces[randNum]));
}

/**
 * Starts to drop the next piece after the current piece has been locked
 */
function startNextPiece()
{
    // Resets various variables that relate to the current piece
    usedHold = false;
    clearInterval(currentGameTick);

    // Replaces current piece with the next piece and generates a new piece to be the next piece
    currentPiece = nextPiece;
    nextPiece = createPiece();

    // Checks if the new piece has room in the current board to generate, and if not, ends the game
    if(!canGenerate(currentPiece.getOrigin(), currentPiece.getPieces())){
        currentPiece.move(currentPiece.getOrigin(), currentPiece.getOrigin(), currentPiece.getPieces(), currentPiece.getPieces());
        endGame();
    }
    else{
        currentPiece.move(currentPiece.getOrigin(), currentPiece.getOrigin(), currentPiece.getPieces(), currentPiece.getPieces());
        currentGameTick = setInterval(
            gameLoop, currentTickSpeed
        )
    }
    updateGraphics();
}

/**
 * Checks for whether the current level should be updated, if so, updates it as well as the speed that the blocks fall
 */
function updateLevel()
{
    let nextLevel = currentLevel+1;
    let toNextLevel = nextLevel*10;
    if(linesCleared>=toNextLevel){
        currentLevel++;
        currentTickSpeed = dropSpeed[Math.min(currentLevel, highestEffectiveLevel)];
    }
    
}

/**
 * Updates the highest scores list with the current score
 */
function updateTopScores()
{
    let swapScore = currentScore;
    for(let i = 0; i < topScores.length; i++){
        if(swapScore > topScores[i]){
            let newSwapScore = topScores[i];
            topScores[i] = swapScore;
            swapScore = newSwapScore;
        }
    }
}

/**
 * Begins the game loop
 */
function startGame()
{
    // Sets various game-state variables and begins the audio
    if(canStart){
        music = document.createElement("audio");
        music.setAttribute('src', '19.mp3');
        music.loop = true;
        music.play();

        gameInProgress = true;
        canStart = false;
        nextPiece = createPiece();
        startNextPiece();
    }
}

/**
 * Ends the game loop
 */
function endGame()
{
    clearInterval(currentGameTick);
    gameInProgress = false;
    setTimeout(resetGame, 3000);
}

/**
 * Clears the board and resets all game-related features
 */
function resetGame()
{
    updateTopScores();
    currentScore = 0;
    currentLevel = 0;
    linesCleared = 0;
    currentTickSpeed = 800;
    currentPiece = null;
    currentGameTick = null;
    heldPiece = null;
    usedHold = false;
    nextPiece = null;
    music.pause();
    music = null;


    for(let i = 0; i < boardHeight; i++){
        for(let j = 0; j < boardWidth; j++){
            boardArray[i][j] = 0;
        }
    }
    updateGraphics();

    canStart = true;
}

function gameLoop()
{
    if(currentPiece!=null && !currentPiece.isLocked()){
        currentPiece.moveDown();
    }
}








//Array manipulation methods

/**
 * Moves the tetrimino in the 2-D board array
 * @param {Array<Number>} oldOrigin - the array representing the old origin of the piece 
 * @param {Array<Number>} newOrigin - the array representing the new origin of the piece 
 * @param {Array<Array<Number>>} oldPieces - the 2-D array representing the list of the old block locations 
 * @param {Array<Array<Number>>} newPieces - the 2-D array representing the list of the new block locations 
 * @param {Number} tetriminoNumber - the number corresponding with the piece type
 */
function moveTetriminoInArray(oldOrigin, newOrigin, oldPieces, newPieces, tetriminoNumber)
{
    //console.log(JSON.stringify(boardArray));
    let or = oldOrigin[0]; let oc = oldOrigin[1];
    for(let i = 0; i < oldPieces.length; i++){
        let row = or + oldPieces[i][0];
        let col = oc + oldPieces[i][1];
        boardArray[row][col] = 0;
    }

    let nr = newOrigin[0]; let nc = newOrigin[1];
    for(let i = 0; i < newPieces.length; i++){
        let row = nr + newPieces[i][0];
        let col = nc + newPieces[i][1];
        boardArray[row][col] = tetriminoNumber;
    }
}

/**
 * Removes the tetrimino from the 2-D board array
 * @param {*} origin - the array representing the origin of the piece 
 * @param {*} pieces - the 2-D array representing the list of block locations 
 */
function eraseTetriminoInArray(origin, pieces){
    for(let i = 0; i < pieces.length; i++){
        let row = origin[0] + pieces[i][0];
        let col = origin[1] + pieces[i][1];
        boardArray[row][col] = 0;
    }
}

/**
 * Clears any full lines on the board
 */
function clearLines()
{
    let streak = 0;
    let newBoard = new Array(20);
    let ptr = 19;

    //Iterates through the board to check for full lines, removes them from the board, and upates the score
    for(let i = boardHeight - 1; i>=0; i--){
        let fullLine = true;
        for(let j = 0; j < boardWidth; j++){
            if(boardArray[i][j]==0) fullLine = false;
        }
        if(fullLine){
            linesCleared++;
            streak++;
        }
        else{
            addScore(streak);
            streak = 0; 
            newBoard[ptr] = boardArray[i];
            ptr--;
        }
    }
    addScore(streak);  

    //Fills in extra empty lines at the top to replace the deleted filled lines
    while(ptr>=0){
        let emptyLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        newBoard[ptr] = emptyLine;
        ptr--;
    } 
    boardArray = newBoard;
}








//Check methods

/**
 * Checks whether a new piece has room to be generated
 * @param {Array<Number>} origin - the array representing the origin of the piece
 * @param {Array<Array<Number>>} pieces - the 2-D array representing the list of block locations
 * @returns {Boolean} whether a new piece has room to be generated
 */
function canGenerate(origin, pieces)
{
    for(let i = 0; i < pieces.length; i++){
        if(boardArray[pieces[i][0]+origin[0]][pieces[i][1]+origin[1]]!=0) return false;
    }
    return true;
}

/**
 * Checks if a piece can be moved to a desired position
 * @param {Array<Number>} oldOrigin - the array representing the old origin of the piece 
 * @param {Array<Number>} newOrigin - the array representing the new origin of the piece 
 * @param {Array<Array<Number>>} oldPieces - the 2-D array representing the list of the old block locations 
 * @param {Array<Array<Number>>} newPieces - the 2-D array representing the list of the new block locations 
 * @returns {Boolean} whether a piece can be moved to a desired destination
 */
function validMove(oldOrigin, newOrigin, oldPieces, newPieces)
{
    let cr = newOrigin[0]; let cc = newOrigin[1];

    for(let i = 0; i < newPieces.length; i++){
        let row = cr + newPieces[i][0];
        let col = cc + newPieces[i][1];
        
        // Checks for out-of-bounds
        if(row<0 || row >= boardHeight || col < 0 || col>=boardWidth)
        {
            return false;
        } 

        // Checks for collisions
        if((boardArray[row][col]!=0)){
            if(!contains([row, col], oldPieces, oldOrigin)){
                return false;
            }
        }
    }
    return true;
}



//Helper methods

/**
 * Helper function to check if an array is contained in a 2-D array (hard-coded for arrays of specific sizes)
 * @param {Array<Number>} find - the array to check for
 * @param {Array<Array<Number>>} lookIn - the 2-D array to search in
 * @returns 
 */
function contains(find, lookIn, oldOrigin)
{
    for(let i = 0; i < lookIn.length; i++){
        if(find[0]==lookIn[i][0]+oldOrigin[0] && find[1]==lookIn[i][1]+oldOrigin[1]) return true;
    }
    return false;
}

/**
 * Adds to the current score depending on the number of lines cleared
 * @param {Number} streak - the number of lines in a row cleared
 */
function addScore(streak)
{
    switch(streak){
        case 1:
            currentScore += singleScore * (currentLevel + 1);
            break;
        case 2:
            currentScore += doubleScore * (currentLevel + 1);
            break;
        case 3:
            currentScore += tripleScore * (currentLevel + 1);
            break;
        case 4:
            currentScore += tetrisScore * (currentLevel + 1);
            break;
    }
}
