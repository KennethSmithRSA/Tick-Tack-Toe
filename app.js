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

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const gameControl = (() => {
    const renderGameBoard = () => {
        const boardContainer = document.querySelector('.boardContainer');
        let length = GameBoard.gameBoardObj.gameBoardArr.length;
        for (let i = 0; i < length; i++) {
            let cell = document.createElement('div');
            cell.classList.add(`cell`);
            cell.setAttribute('data-index', `${i}`);
            cell.textContent = GameBoard.gameBoardObj.gameBoardArr[i];
            boardContainer.append(cell);
        }
    };

    let count = 0;

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
                arr.splice(cell.dataset.index, 1, cell.textContent);
                cell.preventDefault();
                count++;
                console.log(arr);
                checkGameEndConditions(arr)
            })
        });
    };

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

    const checkGameEndConditions = (arr) => {
        let roundWin = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = arr[winCondition[0]];
            let b = arr[winCondition[1]];
            let c = arr[winCondition[2]];

            if (a === b && b === c) {
                console.log('Win');
                break;
            }

            if (count === 9 && roundWin === false) {
                console.log('tie');
            }
        }
    }

    return {
        renderGameBoard,
        ChangeSymbol,
    }
})();

gameControl.renderGameBoard();
gameControl.ChangeSymbol();