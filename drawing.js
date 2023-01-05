const board = document.getElementById("gameBoard");
const scoreBoard = document.getElementById("score");
const heldPieceScreen = document.getElementById("heldPieceScreen");
const nextPieceScreen = document.getElementById("nextPieceScreen");
const titleScreen = document.getElementById("midTop");
const heldPieceTitle = document.getElementById("heldPieceName");
const nextPieceTitle = document.getElementById("nextPieceName");
const controls = document.getElementById("controls");

const canvasHeight = 600;
const canvasWidth = 300;
const smallCanvasHeight = 150;
const smallCanvasWidth = 150;

function initialize()
{
    drawBoard();
    drawHoldPieceScreen();
    drawScore();
    drawNextPieceScreen();
    drawTitle();
    drawControls();
}

function update()
{
    drawBoard();
    drawHoldPieceScreen();
    drawScore();
    drawNextPieceScreen();
}

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

function drawScore()
{
    scoreBoard.innerText = "Score: " + currentScore + "\nLevel: " + currentLevel + "\nLines Cleared: " + linesCleared;
}

function drawControls()
{
    controls.innerText = "Controls: \n\nUp : Rotate \n\nLeft : Move Left \n\nRight : Move Right \n\nDown : Move Down \n\nSpace : Instant Drop \n\nC : Hold";
}

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

function drawTitle()
{
    titleScreen.innerText = "TETRIS";
    heldPieceTitle.innerHTML = "HOLD";
    nextPieceTitle.innerHTML = "NEXT";
}

