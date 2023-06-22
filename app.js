// Module pattern to create gameBoard array as a property of the gameBoard object 
const GameBoard = (() => {
    const gameBoardObj = {
        gameBoardArr: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    }
    return {
        gameBoardObj,
    }
})();

// Factory function to create player objects
const Player = (name, symbol) => {
    return {name, symbol}
}

// Initialise players and player flag
let player1 = Player('Player1', 'X');
let player2 = Player('Player2', 'O');

let playerFlag = player1;

// Module pattern to contain game functions and reduce global scope pollution
const gameControl = (() => {
    let toggleNavBtn = document.getElementById('toggle-nav');
    let nav = document.getElementById('navlist');
    const boardContainer = document.querySelector('.boardContainer');
    let roundWin = false;
    let count = 0;
    // Array of arrays to test the gameBoard array against to test game end conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // Function that changes the display that shows players whose turn it is.
    const changePlayerTurnDisplay = () => {
        let playerTurnDisplay = document.getElementById('playerTurn');
        playerTurnDisplay.innerText = `Turn: ${playerFlag.name} Symbol: ${playerFlag.symbol}`
    }

    // Function to create the gameBoard. changeSymbol has to be here to avoid eventListener conflicts.
    const renderGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.classList.add(`cell`);
            cell.setAttribute('data-index', `${i}`);
            cell.textContent = GameBoard.gameBoardObj.gameBoardArr[i];
            boardContainer.append(cell);
            changePlayerTurnDisplay();
            ChangeSymbol();
        }
    };

    // Function that changes the symbol of the selected cell and checks game win conditions at each turn.
    const ChangeSymbol = () => {
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (cell.textContent === 'X' || cell.textContent === 'O') {
                    cell.textContent = cell.textContent;
                } else {
                    cell.textContent = playerFlag.symbol;
                    playerFlag = changePlayerFlag(playerFlag);
                }
                GameBoard.gameBoardObj.gameBoardArr.splice(cell.dataset.index, 1, cell.textContent);
                count++;
                changePlayerTurnDisplay();
                checkGameEndConditions(GameBoard.gameBoardObj.gameBoardArr)
            })
        });
    };

    // Function that changes the playerFlag value
    const changePlayerFlag = (playerFlag) => {
        return ((playerFlag === player1) ? player2 : player1)
    }

    // Function that reRenders gameBoard and zeros variables to allow for a new game.
    const restartGame = () => {
        let restartGameBtn = document.getElementById('restartGameBtn');
        restartGameBtn.addEventListener('click', () => {
            playerFlag = player1;
            while (boardContainer.firstChild) {
                boardContainer.removeChild(boardContainer.firstChild);
            }
            GameBoard.gameBoardObj.gameBoardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            renderGameBoard();
        })
    }

    // Function that test current gameBoard against end game conditions
    const checkGameEndConditions = (arr) => {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = arr[winCondition[0]];
            let b = arr[winCondition[1]];
            let c = arr[winCondition[2]];

            if (a === b && b === c) {
                console.log('Win');
                roundWin = true;
                break;
            }

            if (count === 9 && roundWin === false) {
                console.log('tie');
            }
        }
    }

    // Function that hides or shows the navbar onclick of the hamburger icon
    const toggleNav = () => {
        if (nav.style.display === "") {
            nav.style.display = "block";
        } else {
            nav.style.display = "";
        }
    }
    
    // function that automatically shows the navbar at screenwidth > 500
    const windowResizeHandler = () => {
        if (screen.width > 500) {
            nav.style.display = "";
        }
    }

    return {
        renderGameBoard,
        ChangeSymbol,
        restartGame,
        toggleNav,
        windowResizeHandler,
        toggleNavBtn
    }
})();

// Calls to all functions that are needed to make game run
gameControl.renderGameBoard();
gameControl.ChangeSymbol();
gameControl.restartGame();
window.addEventListener('resize', gameControl.windowResizeHandler);
gameControl.toggleNavBtn.addEventListener('click', gameControl.toggleNav);