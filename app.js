const GameBoard = (() => {
    const gameBoardObj = {
        gameBoardArr: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    }
    return {
        gameBoardObj,
    }
})();

const Player = (name, symbol) => {
    return {name, symbol}
}

let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');

let playerFlag = player2;

const gameControl = (() => {
    const boardContainer = document.querySelector('.boardContainer');
    let toggleNavBtn = document.getElementById('toggle-nav');
    let nav = document.getElementById('navlist');
    let restartGameBtn = document.getElementById('restartGameBtn');
    let roundWin = false;
    let count = 0;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const renderGameBoard = () => {
        let length = GameBoard.gameBoardObj.gameBoardArr.length;

        // for (let i = 0; i < length; i++) {
        //     boardContainer.innerHTML += `<div class="cell" data-index="${i}">${GameBoard.gameBoardObj.gameBoardArr[i]}</>`
        // }

        for (let i = 0; i < length; i++) {
            let cell = document.createElement('div');
            cell.classList.add(`cell`);
            cell.setAttribute('data-index', `${i}`);
            cell.textContent = GameBoard.gameBoardObj.gameBoardArr[i];
            boardContainer.append(cell);
        }
    };

    const ChangeSymbol = () => {
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (cell.textContent === 'X' || cell.textContent === 'O') {
                    cell.textContent = cell.textContent;
                } else {
                    if (playerFlag === player2) {
                        playerFlag = player1;
                    } else {
                        playerFlag = player2;
                    }
                    cell.textContent = playerFlag.symbol;
                }
                GameBoard.gameBoardObj.gameBoardArr.splice(cell.dataset.index, 1, cell.textContent);
                count++;
                console.log(GameBoard.gameBoardObj.gameBoardArr);
                checkGameEndConditions(GameBoard.gameBoardObj.gameBoardArr)
            })
        });
    };

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

    const restartGame = () => {
        GameBoard.gameBoardObj.gameBoardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        while (boardContainer.hasChildNodes())
        boardContainer.removeChild(boardContainer.firstChild);
        renderGameBoard();
    }

    const toggleNav = () => {
        if (nav.style.display === "") {
            nav.style.display = "block";
        } else {
            nav.style.display = "";
        }
    }
    
    const windowResizeHandler = () => {
        if (screen.width > 500) {
            nav.style.display = "";
        }
    }

    return {
        renderGameBoard,
        ChangeSymbol,
        toggleNav,
        windowResizeHandler,
        restartGame,
        restartGameBtn,
        toggleNavBtn
    }
})();

gameControl.renderGameBoard();
gameControl.ChangeSymbol();

window.addEventListener('resize', gameControl.windowResizeHandler);
gameControl.toggleNavBtn.addEventListener('click', gameControl.toggleNav);
gameControl.restartGameBtn.addEventListener('click', gameControl.restartGame);