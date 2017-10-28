const inquirer = require('inquirer');
const Gameboard = require('./gameboard.js');

// Set up the gameboard and status interval
// Immediately Invoked
// Recursive
(function playGame() {
    // create new Gameboard
    let gameBoard = new Gameboard;

    // create interval to wait for word to get set
    let gameStatus = setInterval(function () {
        if (gameBoard.gameWord.isSet === false) {
            console.log('waiting for word...');
        }
        else if (gameBoard.newGame === true) {
            clearInterval(gameStatus);

            inquirer.prompt({
                type: 'confirm',
                name: 'playAgain',
                message: 'Play Again?',
                default: false
            }).then(
                function (answer) {
                    if (answer.playAgain) {
                        playGame();
                    } else {
                        console.log('Good bye!');
                    }
                }
            );
        }
        else if (gameBoard.inProgress === false) {
            // start game since we have a word
            gameBoard.startGame();
        }
        // should add a way to escape if fails
    }, 500);
})();