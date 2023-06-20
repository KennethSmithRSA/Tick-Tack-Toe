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

    const ChangeSymbol = () => {
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (player === player2) {
                    player = player1;
                } else {
                    player = player2;
                }

                if (cell.textContent === 'X' || cell.textContent === 'O') {
                    cell.textContent = cell.textContent;
                } else {
                    cell.textContent = player.symbol;
                }
            })
        });
    }

    return {
        renderGameBoard,
        ChangeSymbol,
    }
})();



let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');

let player = player2;



gameControl.renderGameBoard();
gameControl.ChangeSymbol();