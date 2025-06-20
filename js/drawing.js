// HTML element references
const board = document.getElementById("gameBoard");
const scoreBoard = document.getElementById("score");
const heldPieceScreen = document.getElementById("heldPieceScreen");
const nextPieceScreen = document.getElementById("nextPieceScreen");
const titleScreen = document.getElementById("midTop");
const heldPieceTitle = document.getElementById("heldPieceName");
const nextPieceTitle = document.getElementById("nextPieceName");
const controls = document.getElementById("controls");
const levelSelect = document.getElementById("levelSelect");


// Canvas-related constants
const canvasHeight = 600;
const canvasWidth = 300;
const smallCanvasHeight = 150;
const smallCanvasWidth = 150;

const scoreBoardDisplayLength = 3;

const controlsObj = retrieveControls();


/**
 * Draws all of the necessary graphical components when the window loads
 */
function initializeGraphics()
{
    drawBoard();
    drawHoldPieceScreen();
    drawScore();
    drawNextPieceScreen();
    drawTitle();
    drawControls();
    drawLevelSelector();
}

/**
 * Updates the graphical components during the game
 */
function updateGraphics()
{
    drawBoard();
    drawHoldPieceScreen();
    drawScore();
    drawNextPieceScreen();
}






// Drawing-related

/**
 * Draws the game board with the current pieces
 */
function drawBoard()
{
    let ctx = board.getContext("2d");
    ctx.lineWidth = 1;

    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            ctx.fillStyle = tetriminoNumberToColor.get(boardArray[i][j]);
            ctx.fillRect(j*30, i*30, 30, 30);
        }
    }

    ctx.strokeStyle = "white";
    for(let i = 30; i < canvasWidth; i+=30){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
        ctx.stroke();
    }
    
    for(let i = 30; i < canvasHeight; i+=30){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasWidth, i);
        ctx.stroke();
    }
}

/**
 * Draws the held-piece screen
 */
function drawHoldPieceScreen()
{
    let ctx = heldPieceScreen.getContext("2d");
    ctx.lineWidth = 1;

    ctx.fillStyle = "darkslategray";
    ctx.fillRect(0, 0, 150, 150);

    if(heldPiece != null){
        let pieces = heldPiece.getPieces();
        for(let i = 0; i < heldPiece.getPieces().length; i++){
            let row = pieces[i][0] + 1; let col = pieces[i][1] + 1;
            ctx.fillStyle = tetriminoNumberToColor.get(heldPiece.getNumber());
            ctx.fillRect(col*30, row*30, 30, 30);
        }
    }

    ctx.strokeStyle = "white";
    for(let i = 30; i < smallCanvasWidth; i+=30){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, smallCanvasHeight);
        ctx.stroke();
    }
    
    for(let i = 30; i < smallCanvasHeight; i+=30){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(smallCanvasWidth, i);
        ctx.stroke();
    }

}

/**
 * Draws the next-piece screen
 */
function drawNextPieceScreen()
{
    let ctx = nextPieceScreen.getContext("2d");
    ctx.lineWidth = 1;

    ctx.fillStyle = "darkslategray";
    ctx.fillRect(0, 0, 150, 150);

    if(nextPiece != null){
        let pieces = nextPiece.getPieces();
        for(let i = 0; i < nextPiece.getPieces().length; i++){
            let row = pieces[i][0] + 1; let col = pieces[i][1] + 1;
            ctx.fillStyle = tetriminoNumberToColor.get(nextPiece.getNumber());
            ctx.fillRect(col*30, row*30, 30, 30);
        }
    }

    ctx.strokeStyle = "white";
    for(let i = 30; i < smallCanvasWidth; i+=30){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, smallCanvasHeight);
        ctx.stroke();
    }
    
    for(let i = 30; i < smallCanvasHeight; i+=30){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(smallCanvasWidth, i);
        ctx.stroke();
    }
}






// Writing-related

/**
 * Updates the current game statistics
 */
function drawScore()
{
    let tetrisRate = Math.floor((tetrisLinesCleared / Math.max(1, linesCleared)) * 100);
    let scoreBoardString = "Score: " + currentScore + "\nLevel: " + currentLevel + "\nLines Cleared: " + linesCleared + "\nTetris Rate: " + tetrisRate + "%"; 
    scoreBoard.innerText = scoreBoardString;
}

/**
 * Writes the list of controls
 */
function drawControls()
{
    let str = `
        Controls: \n
        ${controlsObj["rotateLeft"]}: Rotate Left\n
        ${controlsObj["rotateRight"]}: Rotate Right \n
        ${controlsObj["left"]}: Move Left \n
        ${controlsObj["right"]}: Move Right \n
        ${controlsObj["down"]}: Move Down \n
        ${controlsObj["instantDrop"]}: Instant Drop \n
        ${controlsObj["hold"]}: Hold
        `;

        while(str.indexOf("Key")!=-1) str = str.replace("Key", "");
        while(str.indexOf("Arrow")!=-1) str = str.replace("Arrow", "");
        
    controls.innerText = str;
}

/**
 * Writes various labels
 */
function drawTitle()
{
    titleScreen.innerText = "TETRIS";
    heldPieceTitle.innerHTML = "HOLD";
    nextPieceTitle.innerHTML = "NEXT";
}

/**
 * Creates the level selector
 */
function drawLevelSelector()
{
    for(let i = 0; i < 30; i++){
        let str = String(i);
        let op = document.createElement("option");
        op.textContent = str;
        levelSelect.appendChild(op);
    }
}

