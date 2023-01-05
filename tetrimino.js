const tetriminoMap = new Map(
    [
        ['I', 
            [ 
                [[1, 0],[1, 1], [1, 2], [1, 3]], 
                [[0, 2],[1, 2], [2, 2], [3, 2]], 
                [[2, 0],[2, 1], [2, 2], [2, 3]], 
                [[0, 1],[1, 1], [2, 1], [3, 1]] 
            ]
        ],

        ['S',
            [ 
                [[1, 0],[1, 1], [0, 1], [0, 2]], 
                [[0, 1],[1, 1], [1, 2], [2, 2]], 
                [[2, 0],[2, 1], [1, 1], [1, 2]], 
                [[0, 0],[1, 0], [1, 1], [2, 1]] 
            ]
        ],

        ['Z',
            [ 
                [[0, 0],[0, 1], [1, 1], [1, 2]], 
                [[2, 1],[1, 1], [1, 2], [0, 2]], 
                [[1, 0],[1, 1], [2, 1], [2, 2]], 
                [[2, 0],[1, 0], [1, 1], [0, 1]] 
            ]
        ],

        ['T',
            [ 
                [[1, 0],[1, 1], [1, 2], [0, 1]], 
                [[0, 1],[1, 1], [2, 1], [1, 2]], 
                [[1, 0],[1, 1], [1, 2], [2, 1]],
                [[0, 1],[1, 1], [2, 1], [1, 0]]
            ]
        ],

        ['L',
            [ 
                [[1, 0],[1, 1], [1, 2], [0, 2]], 
                [[0, 1],[1, 1], [2, 1], [2, 2]], 
                [[1, 0],[1, 1], [1, 2], [2, 0]], 
                [[0, 1],[1, 1], [2, 1], [0, 0]]
            ]
        ],

        ['J',
            [ 
                [[1, 0],[1, 1], [1, 2], [0, 0]], 
                [[0, 1],[1, 1], [2, 1], [0, 2]], 
                [[1, 0],[1, 1], [1, 2], [2, 2]], 
                [[0, 1],[1, 1], [2, 1], [2, 0]]
            ]
        ],

        ['O',
            [ 
                [[0, 1],[0, 2], [1, 1], [1, 2]], 
                [[0, 1],[0, 2], [1, 1], [1, 2]],
                [[0, 1],[0, 2], [1, 1], [1, 2]],
                [[0, 1],[0, 2], [1, 1], [1, 2]]
            ]
        ],
    ]
);

const tetriminoNumber = new Map(
    [
        ['I', 1],
        ['S', 2],
        ['Z', 3],
        ['T', 4],
        ['L', 5],
        ['J', 6],
        ['O', 7],
    ]
);

const tetriminoNumberToColor = new Map(
    [
        [0, "darkslategray"],
        [1, "cyan"],
        [2, "lime"],
        [3, "red"],
        [4, "blueviolet"],
        [5, "orange"],
        [6, "blue"],
        [7, "yellow"],
    ]
);

class Tetrimino
{
    /**
     * 
     * @param {string} pieceType - the character describing the piece
     * @param {Array} origin - an array of length 2 that describes the row and column of the piece's origin
     * @param {Number} number - the number describing the piece (used in the 2-D array representation of the board)
     */
    constructor(pieceType, origin, number)
    {
        this.pieceType = pieceType;
        this.currentRot = 0;
        this.pieceArr = tetriminoMap.get(this.pieceType);
        this.currentOrigin = origin;
        this.currentPieces = this.pieceArr[0];
        this.locked = false;
        this.lockDelayInterval = null;
        this.number = number;
    }

    /**
     * Rotates the piece if possible
     */
    rotate()
    {
        if(!this.locked){
            let oldPieces = this.currentPieces;
            this.currentRot++; 
            this.currentRot%=4;
            let newPieces = this.pieceArr[this.currentRot];
            if(validMove(this.currentOrigin, this.currentOrigin, oldPieces, newPieces)){
                this.currentPieces = newPieces;
                this.move(this.currentOrigin, this.currentOrigin, oldPieces, newPieces);

                if(this.lockDelayInterval!=null){
                    clearInterval(this.lockDelayInterval);
                    this.lockDelayInterval = null;
                }
            }
        }
    }

    /**
     * Moves the piece down one row if possible
     * If it cannot move downwards, a timer is set to lock the piece if not moved for a certain amount of time
     */
    moveDown()
    {
        if(!this.locked && this.lockDelayInterval == null){
            let oldOrigin = this.currentOrigin;
            let newOrigin = [this.currentOrigin[0]+1, this.currentOrigin[1]];
            if(validMove(oldOrigin, newOrigin, this.currentPieces, this.currentPieces)){
                this.currentOrigin = newOrigin;
                this.move(oldOrigin, newOrigin, this.currentPieces, this.currentPieces);
            }
            else{
                this.lockDelayInterval = setTimeout(() => {
                    currentPiece.lock();
                }, currentLockSpeed);
            }
           // console.log("Moving");
        }
    }

    /**
     * Moves the piece left one column if possible
     */
    moveLeft()
    {
        if(!this.locked){
            let oldOrigin = this.currentOrigin;
            let newOrigin = [this.currentOrigin[0], this.currentOrigin[1]-1];
            if(validMove(oldOrigin, newOrigin, this.currentPieces, this.currentPieces)){
                this.currentOrigin = newOrigin;
                this.move(oldOrigin, newOrigin, this.currentPieces, this.currentPieces);
                if(this.lockDelayInterval!=null){
                    clearInterval(this.lockDelayInterval);
                    this.lockDelayInterval = null;
                }
            }
        }

    }

    /**
     * Moves the piece right one column if possible
     */
    moveRight()
    {
        if(!this.locked){
            let oldOrigin = this.currentOrigin;
            let newOrigin = [this.currentOrigin[0], this.currentOrigin[1]+1];
            if(validMove(oldOrigin, newOrigin, this.currentPieces, this.currentPieces)){
                this.currentOrigin = newOrigin;
                this.move(oldOrigin, newOrigin, this.currentPieces, this.currentPieces);
                if(this.lockDelayInterval!=null){
                    clearInterval(this.lockDelayInterval);
                    this.lockDelayInterval = null;
                }
            }
        }
    }

    /**
     * Moves the tetrimino in the 2-D board to the desired position (assumes that the new position is valid)
     * @param {Array<Number>} oldOrigin - an array of length 2 that describes the current origin
     * @param {Array<Number>} newOrigin - an array of length 2 that describes the origin to move to
     * @param {Array<Array>} oldPieces - an array of arrays of numbers that describes where each block is in the current piece
     * @param {Array<Array>} newPieces - an array of arrays of numbers that describes where each block is in the piece to change into
     */
    move(oldOrigin, newOrigin, oldPieces, newPieces)
    {
        moveTetriminoInArray(oldOrigin, newOrigin, oldPieces, newPieces, this.number);

        update();
    }

    //Getters

 
    /**
     * Returns the current origin
     * @returns {Array<Number>} the array representing the origin
     */
    getOrigin()
    {
        return this.currentOrigin;
    }

    /**
     * Returns the current blocks in the piece
     * @returns {Array<Array>} the 2-D array representing the list of block locations in this piece
     */
    getPieces()
    {
        return this.currentPieces;
    }

    /**
     * Returns the number corresponding with this piece type
     * @returns {Number} the number corresponding with this piece type
     */
    getNumber()
    {
        return this.number;
    }

    /**
     * Returns whether this piece is locked
     * @returns {Boolean} whether the current piece is locked
     */
    isLocked()
    {
        return this.locked;
    }

    //Setters

    /**
     * Sets the current origin to a new origin
     * @param {Array<Number>} origin - an array representing the new origin
     */
    setOrigin(origin)
    {
        this.currentOrigin = origin;
    }

    /**
     * Locks the piece to prevent moving, clears the full lines, and creates the next piece
     */
    lock()
    {
        clearInterval(this.lockDelayInterval);
        this.locked = true;

        clearLines();
        updateLevel();
        startNextPiece();
    }

    //Resetters

    /**
     * Resets the lock delay
     */
    resetInterval()
    {
        clearInterval(this.lockDelayInterval);
        this.lockDelayInterval = null;
    }

    /**
     * Resets the rotation to the original state
     */
    resetRot()
    {
        this.currentRot = 0;
        this.currentPieces = this.pieceArr[0];
    }
}