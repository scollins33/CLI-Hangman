const Gameboard = require('./gameboard.js');

// create new Gameboard
let gameBoard = new Gameboard;

// create interval to wait for word to get set
let wordCheck = setInterval(function () {
    if (gameBoard.gameWord.isSet === false) {
        console.log('waiting for word...');
    } else {
        clearInterval(wordCheck);

        // start game since we have a word
        gameBoard.startGame();
    }
    // should add a way to escape if fails
}, 500);