# Tick-Tack-Toe
HTML, CSS, JavaScript Web app. Classic Tic Tac Toe game.

# Overview
This is a web app that uses HTML and CSS to organise and style the layout, while using JavaScript to add functionality.
The main objective to emulate the classic game tic tac toe; In this game a board with a 3X3 grid will be displayed and users take turn placing symbols in one cell at a time, The game ends either when a user has managed to place 3 symbols inline(vertical, horizontal, or diagonal) or when the each cell on the board contains a symbol. A winning game is achieved when a user has placed 3 symbols inline, while a tie is achieve when the board is full and neither of the users has managed to place their symbols inline.

# UI/UX 
The user will be presented a 3X3 grid.
A user input named 'userNameInput' and a button named 'restartBtn' will be displayed as well.

# Input
The users will be able to click on a cell within the grid.
The user will be able to enter text in 'userNameInput' and be able to click 'restartBtn'.

# Output
If user enters text in 'userNameInput', it will be displayed on screen to indicated turns and winnings.

Once a user has clicked on a cell, their corrasponding symbol will displayed in that cell.
On a winning game, A message stating `${user} has won!`. On a tie, a message will state `It's a tie! try again`.

If the user clicks 'restartBtn' the grid will be cleared and variables will be zeroed.

# Logic
The gameboard( 3X3 grid ) will be stored as an array inside a GameBoard object ( created using modules ).

Users will be stored as objects( created using factories ).

A function will need to control the flow of the game.

A function will needed to allow players to placed symbols on certain cells.

A function will be needed to check a game over (3-in-row and tie);


# ToDo
Add option for user to input name and symbol. Revise logic and flow.